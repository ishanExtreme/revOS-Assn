import client from './client';

const table = (params) => client.get("/trips", params);

export default {
    table,
}