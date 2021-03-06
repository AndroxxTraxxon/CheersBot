import { RedeemMode, UserQueueEntry, UserQueueRound, ChannelData, Icon } from './data'

export interface ModuleStateData {

}

export interface ModuleConfigData {
    enabled: boolean
}

export interface ModuleData<State extends ModuleStateData = ModuleStateData, Config extends ModuleConfigData = ModuleConfigData> {
    state: State
    config: Config
}

export interface Module<State extends ModuleStateData = ModuleStateData, Config extends ModuleConfigData = ModuleConfigData> {
    name: string
    description: string

    getData: (data: ChannelData) => ModuleData<State, Config>
}

export interface HeadpatStateData extends ModuleStateData {
    count: number
    streak: number
}

export interface HeadpatConfigData extends ModuleConfigData {
    emote: Icon | null
}

export const HeadpatsModule: Module<HeadpatStateData, HeadpatConfigData> = {
    name: 'Headpats',
    description: 'For Girl_Dm_! Keeps an overlay counter of how many times a certain channel point reward is redeemed.',
    getData: (data: ChannelData) => data.modules.headpats,
}

export interface EvilDmStateData extends ModuleStateData {
    count: number
    time: number
}

export interface EvilDmConfigData extends ModuleConfigData {
    emote: Icon | null
}

export const EvilDmModule: Module<EvilDmStateData, EvilDmConfigData> = {
    name: 'Evil DM',
    description: 'For Girl_Dm_! Keeps an overlay counter of how many times a certain channel point reward is redeemed with certain keywords in the message.',
    getData: (data: ChannelData) => data.modules.evilDm,
}

export interface ModeQueueStateData extends ModuleStateData {
    modes: RedeemMode[]
}

export interface ModeQueueModeConfig {
    id: string
    redeemName: string
    emote: Icon | null
    showUsername: boolean
    startText: string
    runningText: string
    endText: string
}

export interface ModeQueueConfigData extends ModuleConfigData {
    modes: ModeQueueModeConfig[]
}

export const ModeQueueModule: Module<ModeQueueStateData, ModeQueueConfigData> = {
    name: 'Mode Queue',
    description: 'Displays timers in the overlay when certain channel point rewards are redeemed.',
    getData: (data: ChannelData) => data.modules.modeQueue,
}

export interface WinLossStateData extends ModuleStateData {
    display: boolean
    wins: number
    losses: number
    draws: number
    deaths: number
    deathTime: number
}

export interface WinLossConfigData extends ModuleConfigData {
    winningEmote: Icon | null
    tiedEmote: Icon | null
    losingEmote: Icon | null
    deathEmote: Icon | null
}

export const WinLossModule: Module<WinLossStateData, WinLossConfigData> = {
    name: 'Win/Loss Record',
    description: 'Allows channels to track game win/loss records for a stream.',
    getData: (data: ChannelData) => data.modules.winLoss,
}

export interface UserQueueStateData extends ModuleStateData {
    acceptEntries: boolean
    entries: UserQueueEntry[]
    rounds: UserQueueRound[]
}

export interface UserQueueConfigData extends ModuleConfigData {

}

export const UserQueueModule: Module<UserQueueStateData, UserQueueConfigData> = {
    name: 'User Queue',
    description: '--ALPHA-- Allows Twitch chat to submit entries into a queue the streamer can then draw from. Could be used for raffles, viewer game drafting, and similar events.',
    getData: (data: ChannelData) => data.modules.userQueue,
}

export interface BackdropStateData extends ModuleStateData {

}

export interface BackdropConfigData extends ModuleConfigData {

}

export const BackdropModule: Module<BackdropStateData, BackdropConfigData> = {
    name: 'Backdrop',
    description: '--ALPHA-- Interactive Unity application backdrops controlled remotely from the control panel.',
    getData: (data: ChannelData) => data.modules.backdrop,
}

export interface ChannelInfoStateData extends ModuleStateData {

}

export interface ChannelInfoConfigData extends ModuleConfigData {

}

export const ChannelInfoModule: Module<ChannelInfoStateData, ChannelInfoConfigData> = {
    name: 'User and Channel',
    description: 'Displays information about the current user and channel. Don\'t disable unless you know what you\'re doing!',
    getData: (data: ChannelData) => data.modules.channelInfo,
}

export interface DebugStateData extends ModuleStateData {

}

export interface DebugConfigData extends ModuleConfigData {

}

export const DebugModule: Module<DebugStateData, DebugConfigData> = {
    name: 'Debug',
    description: 'Provides information and tools for testing and debugging the control panel. Don\'t enable unless you know what you\'re doing!',
    getData: (data: ChannelData) => data.modules.debug,
}

export const MODULES = {
    headpats: HeadpatsModule,
    evilDm: EvilDmModule,
    modeQueue: ModeQueueModule,
    winLoss: WinLossModule,
    userQueue: UserQueueModule,
    backdrop: BackdropModule,
    channelInfo: ChannelInfoModule,
    debug: DebugModule,
}

export type ModuleType = keyof typeof MODULES

export type ModuleDataType<T extends ModuleType> = ReturnType<typeof MODULES[T]['getData']>

export const MODULE_TYPES = Object.keys(MODULES) as ModuleType[]

export function getModule<T extends ModuleType>(type: T): typeof MODULES[T] {
    return MODULES[type]
}
