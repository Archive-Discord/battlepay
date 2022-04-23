import axios from "axios"
import { config } from "config"

const DiscordWebhook = async(title: string, description: string) => {
    try {
        await axios.post(config.WEBHOOK_URL, {
            embeds: [{
                title: title,
                description: description,
                color: 0x00ff00,
                timestamp: new Date()
            }]
        })
    } catch(e) {
        console.log(e);
    }
}

export default DiscordWebhook