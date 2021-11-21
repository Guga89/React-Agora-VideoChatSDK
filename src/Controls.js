import { useState } from "react";
import { useClient } from "./agoraConfig";
import { Grid, Button } from "@material-ui/core";

import MicIcon from "@material-ui/icons/Mic"
import MicOffIcon from "@material-ui/icons/MicOff"
import VideocamIcon from "@material-ui/icons/Videocam"
import VideocamOffIcon from "@material-ui/icons/VideocamOff"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

const Controls = (props) => {
    const client = useClient();
    const { tracks, setStart, setInCall } = props;
    const [tracksState, setTracksState] = useState({ video: true, audio: true });

    const mute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!tracksState.audio);
            setTracksState((ps) => {
                return { ...ps, audio: !ps.audio }
            })
        } else if (type === "video") {
            await tracks[1].setEnabled(!tracksState.video);
            setTracksState((ps) => {
                return { ...ps, video: !ps.video }
            })
        }
    }
    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item >
                <Button variant='contained' color={tracksState.audio ? "primary" : "secondary"} onClick={() => { mute("audio") }}>
                    {tracksState.audio ? <MicIcon /> : <MicOffIcon />}
                </Button>
            </Grid>
            <Grid item >
                <Button variant='contained' color={tracksState.video ? "primary" : "secondary"} onClick={() => { mute("video") }}>
                    {tracksState.video ? <VideocamIcon /> : <VideocamOffIcon />}
                </Button>
            </Grid>
            <Grid item >
                <Button variant='contained' color="default" onClick={() => { leaveChannel() }}>
                    Leave <ExitToAppIcon />
                </Button>
            </Grid>
        </Grid>
    );
}

export default Controls;
