import { Web3Storage } from "web3.storage";

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyMDU0NzUyYThmQjlhYzEwRmE0NkExNTM4ZDJlNTI1MjYyNTYyNzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODc1Nzg3MTE5MDUsIm5hbWUiOiJTYWZlU3BoZXJlRmlsZVN0b3JhZ2VUb2tlbiJ9.MooNiXHSxBSYFnd9iQaRiwrief5FBugZR46mac1rbVE';

export const web3StorageClient = new Web3Storage({token: API_TOKEN});
