import * as React from 'react'
import { BackdropData, ControlPanelViewData, ControlPanelPage } from 'shared'
import { PanelField } from '../controls/PanelField'
import { getNumberValue, setNumberValue, channelAction } from '../utils'
import { Button } from '../controls/Button'

async function swapCamera() {

}

async function fireCannon() {
    try {

        const count = getNumberValue('evil-input')
        if (count) {
            await channelAction('evildm/adjust', { delta: count })
            setNumberValue('evil-input', 0)
        }
    } catch (e) {
        console.error(e)
    }
}

export function BackdropPanel(props: ControlPanelViewData & BackdropData & { page: ControlPanelPage }) {
    const [cannonText, setCannonText] = React.useState('')

    const swapCamera = async (name: string) => {
        try {
            await channelAction('backdrop/swap-camera', { name })
        } catch (e) {
            console.error(e)
        }
    }

    const fireCannon = async () => {
        try {
            setCannonText('')
            await channelAction('backdrop/fire-cannon', { text: cannonText })
        } catch (e) {
            console.error(e)
        }
    }

    switch (props.page) {
        case ControlPanelPage.view:
            return <>
                <PanelField label="Cameras">
                    <Button primary onClick={e => swapCamera('Home')}>Home</Button>
                    <Button onClick={e => swapCamera('Screen')}>Screen</Button>
                </PanelField>
                <PanelField label="Cannon Text">
                    <input type="text" value={cannonText} onChange={e => setCannonText(e.target.value)} />
                </PanelField>
                <PanelField>
                    <Button onClick={e => fireCannon()}>Fire Cannon</Button>
                </PanelField>
            </>
        default:
            return <></>
    }
}