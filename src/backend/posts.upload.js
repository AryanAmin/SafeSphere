import { web3StorageClient } from "./web3Client";

async function fileUpload(userDataJson){
    const userDataBlob = new Blob([userDataJson], {type: 'application/json'});
    const rootCid = await web3StorageClient.put(userDataBlob);
    return rootCid;
}

