import client from './client';

const vehicle_details = (params) => client.get("/vehicleSnapshot", params);

export default {
    vehicle_details,
}