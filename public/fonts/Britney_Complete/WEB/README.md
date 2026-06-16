# Installing Webfonts
Follow these simple Steps.

## 1.
Put `britney/` Folder into a Folder called `fonts/`.

## 2.
Put `britney.css` into your `css/` Folder.

## 3. (Optional)
You may adapt the `url('path')` in `britney.css` depends on your Website Filesystem.

## 4.
Import `britney.css` at the top of you main Stylesheet.

```
@import url('britney.css');
```

## 5.
You are now ready to use the following Rules in your CSS to specify each Font Style:
```
font-family: Britney-Light;
font-family: Britney-Regular;
font-family: Britney-Bold;
font-family: Britney-Ultra;
font-family: Britney-Variable;

```
## 6. (Optional)
Use `font-variation-settings` rule to controll axes of variable fonts:
wght 900.0

Available axes:
'wght' (range from 300.0 to 900.0

