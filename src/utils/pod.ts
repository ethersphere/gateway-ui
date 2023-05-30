import { POD_USERNAME, POD_PASSWORD, POD_NAME, POD_HOSTV1, POD_HOSTV2 } from '../constants';

const username = POD_USERNAME;
const password = POD_PASSWORD;

const podName = POD_NAME;
const hostv1 = POD_HOSTV1;
const hostv2 = POD_HOSTV2;

function downloadFile() {
  const body = {
    podName,
    filePath: "/index.json"
  }

  return fetch(hostv1 + "file/download", {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include"
  });
}

function uploadFile() {
  const formData = new FormData();

  formData.append("files", fileupload.files[0]);
  formData.set("podName", podName);
  formData.append("fileName", "index.json");
  formData.set("dirPath", "/");
  formData.set("blockSize", "1Mb");

  fetch(hostv1 + "/file/upload", {
    method: "POST",
    body: formData,
    credentials: "include"
  });
}

function userLogin() {
    var data = {
        "userName": username,
        "password": password
    };
    return fetch(hostv2 + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"
    });
}

