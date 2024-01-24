# DCMTK DIMSE Plugin
Raccoon-DICOM 提供另一個使用 DIMSE 的選擇 (i.e. DCMTK DIMSE)，以下將介紹如何開啟 DCMTK DIMSE Plugin

Branch: dcmtk-dimse

## 先前準備
- 關閉 Raccoon 的 DCM4CHE DIMSE
- 將 `.env` 中的 `ENABLE_DIMSE` 環境變數設定為 `false`
```text
...
ENABLE_DIMSE=false
...
```

## 切換至 dcmtk-dimse branch
```bash
git checkout dcmtk-dimse
```

## DCMTK DIMSE 設定
### dcmqrscp 設定檔
- 路徑: `plugins/dcm4raccoon/dcmqrscp.cfg`
- 您可以複製 `plugins/dcm4raccoon/dcmqrscp.example.cfg` 並重新命名為 `dcmqrscp.cfg`

## Plugin 設定檔
- 路徑: `plugins/config.js`
```js
module.exports.pluginsConfig = {
    "dcm4raccoon": {
        // Please setup the dcmqrscp config in the plugin's dcmtk folder if needed.
        // Please config the HostTable in dcmqrscp.cfg in order for people to connect.
        enable: true,
        before: false,
        routers: [],
        // this is temp folder for storing files from c-store.
        storepath: "./plugins/dcm4raccoon/dicomFiles/",
        port: 6066
    }
};
```
- 若有需要使用不同的 port，您可以自行修改監聽的 port

## 啟動
- 就如同啟動 Raccoon-DICOM 一樣
```bash
node server.js
```
