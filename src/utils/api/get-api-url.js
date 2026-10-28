import { config } from "../../config";

export function getApiUrl(endpoint) {
    return `${config.api.base}${config.api.endpoints[endpoint]}`;
}
