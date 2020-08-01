import { RedeemModeDisplay, RedeemMode, RedeemType, Icon, Store } from 'shared'
import { ChannelData } from './data'

export const REDEEM_TYPES: { [key: string]: RedeemType } = {
    ban: 'girldm heccin ban me',
    nyan: 'nyan nyan dm~',
    japanese: 'GIRLDM JAPANESE MODE ACTIVATE',
    saySomething: 'girldm say something!!',
}

export const EVIL_PATTERN = /\b(evil|crimes|crime|puppy|puppies)[!.,]?\b/i

export function addModeDelayed(store: Store<ChannelData>, mode: RedeemMode): void {
    mode.visible = true
    store.set(d => ({
        ...d,
        modes: [...d.modes, mode]
    }))
    /*setTimeout(() => {
        mode.visible = true
        store.touch()
    }, 1000)*/
}

export function removeModeDelayed(store: Store<ChannelData>, mode: RedeemMode): void {
    store.set(d => ({
        ...d,
        modes: d.modes.filter(m => m.id !== mode.id)
    }))
    /*setTimeout(() => {
        store.set(d => ({
            ...d,
            modes: d.modes.filter(m => m.id !== mode.id)
        }))
    }, 1000)*/
}

export function getDisplayModes(modes: RedeemMode[]): RedeemModeDisplay[] {
    return modes.map(mode => {
        const inModePeriod = mode.startTime && mode.duration && (Date.now() - mode.startTime) < mode.duration
        let msg = ''
        if (!mode.startTime) {
            switch (mode.type) {
                case REDEEM_TYPES.ban:
                    msg = 'is getting heccin banned!'
                    break
                case REDEEM_TYPES.nyan:
                    msg = 'It\'s nyan time, nyan~!'
                    break
                case REDEEM_TYPES.japanese:
                    msg = 'GIRLDM JAPANESE MODE ACTIVATE!'
                    break
            }
        } else if (inModePeriod && mode.startTime && mode.duration) {
            const minutesLeft = Math.ceil((mode.duration - (Date.now() - mode.startTime)) / (60 * 1000))
            const minuteText = minutesLeft === 1 ? 'minute' : 'minutes'
            switch (mode.type) {
                case REDEEM_TYPES.ban:
                    msg = `is heccin banned for ${minutesLeft} more ${minuteText}!`
                    break
                case REDEEM_TYPES.nyan:
                    msg = `It's nyan time for ${minutesLeft} more ${minuteText}, nyan~!`
                    break
                case REDEEM_TYPES.japanese:
                    msg = `DM is in Japanese mode for ${minutesLeft} more ${minuteText}!`
                    break
            }
        } else {
            switch (mode.type) {
                case REDEEM_TYPES.ban:
                    msg = `is ready to be freed!`
                    break
                case REDEEM_TYPES.nyan:
                    msg = `Nyan time is over, nyan~!`
                    break
                case REDEEM_TYPES.japanese:
                    msg = `Japanese mode is over! DM can speak English again!`
                    break
            }
        }
        let icon: Icon = { type: 'emote', id: '302175577', name: 'girldmCheer' }
        switch (mode.type) {
            case REDEEM_TYPES.ban:
                icon.id = '302186553'
                icon.name = 'girldmWut'
                break
            default:
                icon.id = '302175577'
                icon.name = 'girldmCheer'
                break
        }
        return {
            ...mode,
            icon,
            msg,
            showName: mode.type === REDEEM_TYPES.ban,
        }
    })
}