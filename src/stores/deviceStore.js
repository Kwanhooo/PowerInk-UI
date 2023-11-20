// store/deviceStore.js
import {defineStore} from 'pinia'

export const useDeviceStore = defineStore('device', {
    state: () => ({
        deviceInfo: {
            id: sessionStorage.getItem('sn'),
        },
        activeMode: Number(0),
    }),
    actions: {
        setDeviceInfo(info) {
            this.deviceInfo = info;
        },
        setActiveMode(mode) {
            this.activeMode = mode;
        }
    }
})
