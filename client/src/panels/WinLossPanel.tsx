import * as React from 'react'
import { ControlPanelAppViewData, ControlPanelPage, ModuleDataType } from 'shared'
import { PanelField } from '../controls/PanelField'
import { channelAction } from '../utils'
import { Button } from '../controls/Button'
import { Toggle } from '../controls/Toggle'
import { TwitchIconPicker } from '../controls/TwitchIconPicker'

export function WinLossPanel(props: ControlPanelAppViewData & ModuleDataType<'winLoss'> & { page: ControlPanelPage }) {
    const setDisplayed = async (display: boolean) => await channelAction('winloss/set-displayed', { display })
    const adjustWins = async (delta: number) => await channelAction('winloss/adjust-wins', { delta })
    const adjustLosses = async (delta: number) => await channelAction('winloss/adjust-losses', { delta })
    const adjustDraws = async (delta: number) => await channelAction('winloss/adjust-draws', { delta })
    const adjustDeaths = async (delta: number) => await channelAction('winloss/adjust-deaths', { delta })
    const clear = async () => await channelAction('winloss/clear', {})

    switch (props.page) {
        case ControlPanelPage.view:
            return <>
                <PanelField label="Display">
                    <Toggle value={props.state.display} onToggle={v => setDisplayed(v)} />
                </PanelField>
                <PanelField label="Wins ($win)">
                    <input type="number" disabled value={props.state.wins} />&nbsp;
                    <Button onClick={e => adjustWins(+1)}>+1</Button>&nbsp;
                    <Button onClick={e => adjustWins(-1)}>-1</Button>
                </PanelField>
                <PanelField label="Losses ($loss)">
                    <input type="number" disabled value={props.state.losses} />&nbsp;
                    <Button onClick={e => adjustLosses(+1)}>+1</Button>&nbsp;
                    <Button onClick={e => adjustLosses(-1)}>-1</Button>
                </PanelField>
                <PanelField label="Draws ($draw)">
                    <input type="number" disabled value={props.state.draws} />&nbsp;
                    <Button onClick={e => adjustDraws(+1)}>+1</Button>&nbsp;
                    <Button onClick={e => adjustDraws(-1)}>-1</Button>
                </PanelField>
                <PanelField label="Deaths ($death)">
                    <input type="number" disabled value={props.state.deaths} />&nbsp;
                    <Button onClick={e => adjustDeaths(+1)}>+1</Button>&nbsp;
                    <Button onClick={e => adjustDeaths(-1)}>-1</Button>
                </PanelField>
                <PanelField>
                    <Button onClick={e => clear()}>Reset all values to zero ($reset)</Button>
                </PanelField>
            </>
        case ControlPanelPage.edit:
            return <>
                <hr />
                <PanelField label="Winning Emote">
                    <TwitchIconPicker selected={props.config.winningEmote} options={props.icons} onSelect={v => channelAction('winloss/set-winning-emote', { emote: v })} />
                </PanelField>
                <PanelField label="Losing Emote">
                    <TwitchIconPicker selected={props.config.losingEmote} options={props.icons} onSelect={v => channelAction('winloss/set-losing-emote', { emote: v })} />
                </PanelField>
                <PanelField label="Tied Emote">
                    <TwitchIconPicker selected={props.config.tiedEmote} options={props.icons} onSelect={v => channelAction('winloss/set-tied-emote', { emote: v })} />
                </PanelField>
                <PanelField label="Death Emote">
                    <TwitchIconPicker selected={props.config.deathEmote} options={props.icons} onSelect={v => channelAction('winloss/set-death-emote', { emote: v })} />
                </PanelField>
            </>
        default:
            return <></>
    }
}
