<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>Proxy Management</h1>
      <Button label="Create Proxy" icon="pi pi-plus" @click="openCreateModal" />
    </div>

    <div class="table-container">
      <DataTable 
        :value="isLoading ? skeletonData : proxies" 
        :paginator="!isLoading" 
        :rows="10"
        responsiveLayout="scroll"
        class="p-datatable-sm"
      >
        <template #empty>
          <div class="empty-state" v-if="!isLoading">
            <i class="pi pi-server empty-icon"></i>
            <p>No proxies found. Create one to get started!</p>
          </div>
        </template>
        
        <Column field="name" header="Name">
          <template #body="slotProps">
            <Skeleton v-if="isLoading" width="100%" />
            <span v-else>{{ slotProps.data.name }}</span>
          </template>
        </Column>

        <Column field="ipAddress" header="IP Address / Host">
          <template #body="slotProps">
            <Skeleton v-if="isLoading" width="100%" />
            <span v-else>{{ slotProps.data.ipAddress }}</span>
          </template>
        </Column>

        <Column header="Actions" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <div style="display: flex; gap: 0.5rem;" v-if="!isLoading">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEditModal(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProxy(slotProps.data)" />
            </div>
            <Skeleton v-else width="4rem" height="2rem" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Create/Edit Modal -->
    <Dialog v-model:visible="isModalVisible" modal :header="modalMode === 'create' ? 'Create New Proxy' : 'Edit Proxy'" :style="{ width: '450px' }" @hide="resetForm">
      <Form id="proxyForm" :resolver="resolver" :initialValues="form" @submit="onFormSubmit" class="form-container" style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
        <div>
          <FormField name="name" v-slot="$field">
            <FloatLabel variant="on">
              <InputText id="proxy-name" name="name" v-model="form.name" :invalid="$field?.invalid" style="width: 100%" autocomplete="off" />
              <label for="proxy-name">Name</label>
            </FloatLabel>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple" style="margin-top: 0.25rem">{{ $field.error?.message }}</Message>
          </FormField>
        </div>
        
        <div>
          <FormField name="ipAddress" v-slot="$field">
            <FloatLabel variant="on">
              <InputText id="proxy-ip" name="ipAddress" v-model="form.ipAddress" :invalid="$field?.invalid" style="width: 100%" autocomplete="off" />
              <label for="proxy-ip">IP Address (e.g. 192.168.1.1:8080)</label>
            </FloatLabel>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple" style="margin-top: 0.25rem">{{ $field.error?.message }}</Message>
          </FormField>
        </div>

        <Message v-if="formError" severity="error" size="small" variant="simple">{{ formError }}</Message>
      </Form>

      <template #footer>
        <Button label="Cancel" text severity="secondary" @click="isModalVisible = false" autofocus />
        <Button :label="modalMode === 'create' ? 'Create' : 'Save'" type="submit" form="proxyForm" />
      </template>
    </Dialog>

    <!-- Delete Confirmation Modal -->
    <Dialog v-model:visible="isDeleteModalVisible" modal header="Confirm Delete" :style="{ width: '350px' }">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span>Are you sure you want to delete <b>{{ proxyToDelete?.name }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="isDeleteModalVisible = false" autofocus />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="deleteProxy" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Skeleton from "primevue/skeleton";
import { Form, FormField } from "@primevue/forms";
import { databases, ID } from "../../lib/appwrite.js";
import { proxyRegex } from "../../constants/validator.js";

const isLoading = ref(true);
const proxies = ref([]);
const skeletonData = ref(Array.from({ length: 5 }));

const isModalVisible = ref(false);
const modalMode = ref("create"); // 'create' or 'edit'
const form = ref({ id: null, name: "", ipAddress: "" });
const formError = ref("");

const isDeleteModalVisible = ref(false);
const proxyToDelete = ref(null);

const dbId = "6a31a1b80021df02203f";
const collectionId = "proxies";

const fetchProxies = async () => {
	isLoading.value = true;
	try {
		const res = await databases.listDocuments(dbId, collectionId);
		proxies.value = res.documents.map((doc) => ({
			id: doc.$id,
			name: doc.name,
			ipAddress: doc.ipAddress,
		}));
	} catch (e) {
		console.error("Failed to fetch proxies", e);
	} finally {
		isLoading.value = false;
	}
};

onMounted(() => {
	fetchProxies();
});

const openCreateModal = () => {
	modalMode.value = "create";
	form.value = { id: null, name: "", ipAddress: "" };
	formError.value = "";
	isModalVisible.value = true;
};

const openEditModal = (proxy) => {
	modalMode.value = "edit";
	form.value = { ...proxy };
	formError.value = "";
	isModalVisible.value = true;
};

const resetForm = () => {
	form.value = { id: null, name: "", ipAddress: "" };
	formError.value = "";
};

const resolver = ({ values }) => {
	const errors = {};
	if (!values.name || !values.name.trim()) {
		errors.name = [{ message: "Name is required." }];
	}
	if (!values.ipAddress || !values.ipAddress.trim()) {
		errors.ipAddress = [{ message: "IP Address is required." }];
	} else if (!proxyRegex.test(values.ipAddress.trim())) {
		errors.ipAddress = [
			{ message: "Invalid Proxy format. Use domain.com or IP:Port." },
		];
	}
	return { errors };
};

const onFormSubmit = async ({ valid }) => {
	if (!valid) return;
	formError.value = "";

	try {
		if (modalMode.value === "create") {
			const doc = await databases.createDocument(
				dbId,
				collectionId,
				ID.unique(),
				{
					name: form.value.name.trim(),
					ipAddress: form.value.ipAddress.trim(),
				},
			);
			proxies.value.push({
				id: doc.$id,
				name: doc.name,
				ipAddress: doc.ipAddress,
			});
		} else {
			await databases.updateDocument(dbId, collectionId, form.value.id, {
				name: form.value.name.trim(),
				ipAddress: form.value.ipAddress.trim(),
			});
			const index = proxies.value.findIndex((p) => p.id === form.value.id);
			if (index !== -1) {
				proxies.value[index] = { ...form.value };
			}
		}

		isModalVisible.value = false;
	} catch (e) {
		console.error(e);
		formError.value = "Failed to save proxy: " + e.message;
	}
};

const confirmDeleteProxy = (proxy) => {
	proxyToDelete.value = proxy;
	isDeleteModalVisible.value = true;
};

const deleteProxy = async () => {
	if (!proxyToDelete.value) return;

	try {
		await databases.deleteDocument(dbId, collectionId, proxyToDelete.value.id);
		proxies.value = proxies.value.filter(
			(p) => p.id !== proxyToDelete.value.id,
		);
		isDeleteModalVisible.value = false;
		proxyToDelete.value = null;
	} catch (e) {
		console.error("Failed to delete proxy", e);
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

.table-container {
  background-color: var(--p-surface-900);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--p-surface-400);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 3rem;
  color: var(--p-surface-500);
}
</style>
