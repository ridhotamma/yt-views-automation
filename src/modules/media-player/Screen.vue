<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>{{ $t('mediaPlayer.title') }}</h1>
      <Button :label="$t('mediaPlayer.newQueue')" icon="pi pi-plus" @click="isModalVisible = true" />
    </div>

    <div class="players-grid">
      <template v-if="isLoading">
        <div v-for="i in 4" :key="'skel-' + i" class="skeleton-card">
          <Skeleton width="100%" height="360px" borderRadius="12px" />
        </div>
      </template>
      <template v-else>
        <MediaPlayerCard
          v-for="player in players"
          :key="player.id"
          :id="player.id"
          :youtubeUrls="player.youtubeUrls"
          :currentQueue="player.currentQueue"
          :proxyIp="player.proxyIp"
          :userAgent="player.userAgent"
          :isLooping="player.isLooping"
          :loopCount="player.loopCount"
          :currentLoop="player.currentLoop"
          @stop="stopPlayer"
          @update-state="(newState) => handleUpdateState(player, newState)"
        />
        <div v-if="players.length === 0" class="empty-state">
          <i class="pi pi-video empty-icon"></i>
          <p>{{ $t('mediaPlayer.noPlayers') }}</p>
        </div>
      </template>
    </div>

    <Dialog
      v-model:visible="isModalVisible"
      modal
      :header="$t('mediaPlayer.newQueue')"
      :style="{ width: '500px' }"
      @hide="resetForm"
    >
      <Form
        id="playerForm"
        :resolver="resolver"
        @submit="onFormSubmit"
        style="display: flex; flex-direction: column; gap: 1rem"
      >
        <div style="margin: 0.5rem 0rem; display: flex; gap: 1rem">
          <FloatLabel variant="on" style="flex: 1">
            <Select
              id="proxy-select"
              v-model="selectedProxyId"
              :options="proxiesList"
              optionLabel="name"
              optionValue="id"
              style="width: 100%"
              showClear
            />
            <label for="proxy-select">{{ $t('mediaPlayer.proxy') }}</label>
          </FloatLabel>
          <FloatLabel variant="on" style="flex: 1">
            <Select
              id="ua-select"
              v-model="selectedUaType"
              :options="uaOptions"
              optionLabel="label"
              optionValue="value"
              style="width: 100%"
            />
            <label for="ua-select">{{ $t('mediaPlayer.userAgent') }}</label>
          </FloatLabel>
        </div>

        <div
          style="
            display: flex;
            gap: 1rem;
            align-items: center;
          "
        >
          <div style="display: flex; align-items: center; gap: 0.5rem; flex: 1">
            <ToggleSwitch inputId="isLooping" v-model="isLooping" />
            <label for="isLooping" style="font-weight: 600; cursor: pointer"
              >{{ $t('mediaPlayer.enableLooping') }}</label
            >
          </div>

          <div style="flex: 1">
            <FloatLabel variant="on">
              <InputNumber
                id="loopCount"
                v-model="loopCount"
                style="width: 100%"
                :min="0"
                :max="1000"
                :disabled="!isLooping"
              />
              <label for="loopCount">{{ $t('mediaPlayer.loopCount') }} (0 = Infinite)</label>
            </FloatLabel>
          </div>
        </div>

        <Divider style="margin: 0.5rem 0;" />

        <div
          v-for="(url, index) in queueList"
          :key="index"
          style="position: relative"
        >
          <FormField :name="'url_' + index" v-slot="$field">
            <FloatLabel variant="on">
              <InputText
                :id="'url-' + index"
                :name="'url_' + index"
                v-model="queueList[index]"
                style="width: 100%"
                autocomplete="off"
                :invalid="$field?.invalid"
              />
              <label :for="'url-' + index"
                >YouTube Video URL {{ index + 1 }}</label
              >
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              style="margin-top: 0.25rem"
            >{{ $field.error?.message }}</Message>
          </FormField>
          <Button
            v-if="queueList.length > 1"
            icon="pi pi-times"
            severity="danger"
            text
            rounded
            style="
              position: absolute;
              right: 0.25rem;
              top: 50%;
              transform: translateY(-50%);
            "
            @click="queueList.splice(index, 1)"
          />
        </div>

        <Message
          v-if="formError"
          severity="error"
          size="small"
          variant="simple"
          >{{ formError }}</Message
        >

        <Button
          :label="$t('mediaPlayer.addUrl')"
          icon="pi pi-plus"
          outlined
          style="width: 100%; margin-top: 0.5rem"
          :disabled="
            authStore.activePlan &&
            queueList.length >= (authStore.activePlan.maxVideoPerQueue || 3)
          "
          @click="queueList.push('')"
        />
      </Form>

      <template #footer>
        <Button
          :label="$t('common.cancel')"
          text
          severity="secondary"
          @click="isModalVisible = false"
          autofocus
        />
        <Button :label="$t('mediaPlayer.addToQueue')" type="submit" form="playerForm" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Skeleton from "primevue/skeleton";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";
import { Form, FormField } from "@primevue/forms";
import MediaPlayerCard from "./components/MediaPlayerCard.vue";
import { ytRegex } from "../../constants/validator.js";
import { databases, ID, Query, DB_ID } from "../../lib/appwrite.js";
import { useAuthStore } from "../../store/auth.js";
import { generateUserAgent } from "../../utils/userAgent.js";

const isModalVisible = ref(false);
const isLoading = ref(true);
const players = ref([]);
const queueList = ref([""]);
const formError = ref("");
const selectedProxyId = ref(null);
const proxiesList = ref([]);
const isLooping = ref(false);
const loopCount = ref(0);
const selectedUaType = ref("random");
const uaOptions = ref([
  { label: "Random (Any)", value: "random" },
  { label: "Windows Desktop", value: "windows" },
  { label: "macOS Desktop", value: "macos" },
  { label: "iPhone Mobile", value: "iphone" },
  { label: "Android Mobile", value: "android" },
]);
const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);

const collectionId = "media_players";

onMounted(async () => {
  isLoading.value = true;
  try {
    await authStore.initAuth();

    if (currentUser.value) {
      const proxyRes = await databases.listDocuments(DB_ID, "proxies");
      proxiesList.value = proxyRes.documents.map((doc) => ({
        id: doc.$id,
        name: doc.name,
        ipAddress: doc.ipAddress,
      }));

      const res = await databases.listDocuments(DB_ID, collectionId, [
        Query.equal("userId", currentUser.value.$id),
        Query.orderDesc("$createdAt"),
      ]);

      players.value = res.documents.map((doc) => {
        const proxy = proxiesList.value.find((p) => p.id === doc.proxyId);
        return {
          id: doc.$id,
          youtubeUrls: doc.youtubeUrls,
          currentQueue: doc.currentQueue,
          userId: doc.userId,
          proxyId: doc.proxyId,
          proxyIp: proxy ? proxy.ipAddress : null,
          userAgent: doc.userAgent,
          isLooping: doc.isLooping || false,
          loopCount: doc.loopCount || 0,
          currentLoop: doc.currentLoop || 0,
        };
      });
    }
  } catch (e) {
    console.error("Failed to fetch players", e);
  } finally {
    isLoading.value = false;
  }
});

const resetForm = () => {
  queueList.value = [""];
  formError.value = "";
  selectedProxyId.value = null;
  selectedUaType.value = "random";
  isLooping.value = false;
  loopCount.value = 0;
};

const resolver = ({ values }) => {
  const errors = {};
  let hasUrl = false;

  queueList.value.forEach((_, index) => {
    const val = values[`url_${index}`];
    if (val && val.trim()) {
      hasUrl = true;
      if (!ytRegex.test(val.trim())) {
        errors[`url_${index}`] = [{ message: "Invalid YouTube URL." }];
      }
    }
  });

  if (!hasUrl) {
    errors["url_0"] = [{ message: "Please provide at least one valid URL." }];
  }

  return { errors };
};

const onFormSubmit = async ({ valid }) => {
  if (!valid) return;
  formError.value = "";

  const urls = queueList.value.map((u) => u.trim()).filter((u) => u);

  if (authStore.activePlan) {
    const maxVideo = authStore.activePlan.maxVideoPerQueue || 3;
    const maxMedia = authStore.activePlan.maxMediaCreationPerDay || 5;

    if (urls.length > maxVideo) {
      formError.value = `Your current plan allows a maximum of ${maxVideo} videos per queue.`;
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const logsRes = await databases.listDocuments(
        DB_ID,
        "media_creation_logs",
        [
          Query.equal("userId", currentUser.value.$id),
          Query.greaterThanEqual("$createdAt", today.toISOString()),
          Query.limit(1),
        ],
      );

      if (logsRes.total >= maxMedia) {
        formError.value = `You have reached the maximum limit of ${maxMedia} media player creations per day for your current plan. Please try again tomorrow or upgrade your plan.`;
        return;
      }
    } catch (err) {
      console.error("Failed to check daily limits", err);
      formError.value =
        "Failed to verify subscription limits. Please try again.";
      return;
    }
  }

  if (!currentUser.value) {
    formError.value = "You must be logged in to create a player.";
    return;
  }

  try {
    const uaType =
      selectedUaType.value === "random" ? null : selectedUaType.value;
    const uaString = generateUserAgent(uaType);

    const doc = await databases.createDocument(
      DB_ID,
      collectionId,
      ID.unique(),
      {
        youtubeUrls: urls,
        userId: currentUser.value.$id,
        currentQueue: 0,
        proxyId: selectedProxyId.value || null,
        userAgent: uaString,
        isLooping: isLooping.value,
        loopCount: loopCount.value || 0,
        currentLoop: 0,
      },
    );

    // Log the media creation
    await databases.createDocument(DB_ID, "media_creation_logs", ID.unique(), {
      userId: currentUser.value.$id,
    });

    const proxy = proxiesList.value.find((p) => p.id === doc.proxyId);

    players.value.unshift({
      id: doc.$id,
      youtubeUrls: doc.youtubeUrls,
      userId: doc.userId,
      currentQueue: doc.currentQueue,
      proxyId: doc.proxyId,
      proxyIp: proxy ? proxy.ipAddress : null,
      userAgent: doc.userAgent,
      isLooping: doc.isLooping || false,
      loopCount: doc.loopCount || 0,
      currentLoop: doc.currentLoop || 0,
    });

    isModalVisible.value = false;
    resetForm();
  } catch (e) {
    console.error(e);
    formError.value = "Failed to save player. " + e.message;
  }
};

const stopPlayer = async (id) => {
  try {
    await databases.deleteDocument(DB_ID, collectionId, id);
    players.value = players.value.filter((p) => p.id !== id);
  } catch (e) {
    console.error("Failed to delete player", e);
  }
};

const handleUpdateState = async (player, newState) => {
  if (newState.currentQueue !== undefined)
    player.currentQueue = newState.currentQueue;
  if (newState.currentLoop !== undefined)
    player.currentLoop = newState.currentLoop;

  try {
    const updatePayload = {};
    if (newState.currentQueue !== undefined)
      updatePayload.currentQueue = newState.currentQueue;
    if (newState.currentLoop !== undefined)
      updatePayload.currentLoop = newState.currentLoop;

    await databases.updateDocument(
      DB_ID,
      collectionId,
      player.id,
      updatePayload,
    );
  } catch (e) {
    console.error("Failed to update player state", e);
  }
};
</script>

<style scoped>
.screen-container {
  padding: 2rem;
  max-height: 100vh;
  overflow-y: auto;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.players-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .players-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--app-card-bg);
  border-radius: 8px;
  color: var(--app-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 3rem;
  color: var(--app-text-muted);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
