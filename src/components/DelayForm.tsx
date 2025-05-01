import { useState, useEffect } from 'react'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Label } from '@components/ui/label'
import { cn } from '@lib/utils'
import { sendMessage } from '@api/sendMessage'
import { toast } from 'react-toastify';
import { isValidUrl } from '@utils/urlValidator'

const DelayForm = () => {
    const [delay, setDelay] = useState('') // Time delay input
    const [unit, setUnit] = useState('seconds') // Time unit (seconds, minutes, hours)
    const [message, setMessage] = useState('') // Message to send
    const [webhookUrl, setWebhookUrl] = useState('') // Webhook URL
    const [buttonLabel, setButtonLabel] = useState('Send')
    const [isSending, setIsSending] = useState(false)
    const [remainingTime, setRemainingTime] = useState(0) // Track remaining time for countdown

    useEffect(() => {
        if (delay && Number(delay) > 0 && unit) {
            setButtonLabel(`Send in ${delay} ${unit}`)
        } else {
            setButtonLabel('Send')
        }
    }, [delay, unit])

    const handleSend = async () => {
        if (!message || !webhookUrl) {
            toast.error("Please provide both the message and the webhook URL.");
            return;
        }

        if (!isValidUrl(webhookUrl)) {
            toast.error("Invalid Webhook URL. Please enter a valid URL.");
            return;
        }

        const delayInMilliseconds = convertToMilliseconds(delay, unit);

        setIsSending(true);

        // Countdown logic
        let timeLeft = delayInMilliseconds / 1000; // Convert to seconds for countdown
        const intervalId = setInterval(() => {
            setRemainingTime(timeLeft); // Correctly update state
            timeLeft -= 1;

            if (timeLeft < 0) {
                clearInterval(intervalId);
            }
        }, 1000); // Update every second

        // Set the button label to countdown
        setButtonLabel(`Sending in ${timeLeft} seconds`);

        // Wait for the delay before sending the message
        setTimeout(async () => {
            await sendDelayedMessage();
        }, delayInMilliseconds); // Wait for the full delay time
    };

    const sendDelayedMessage = async () => {
        try {
            const result = await sendMessage({ message, webhookUrl });

            if (result.success) {
                toast.success("Message sent successfully!");
            } else {
                toast.error(`Error: ${result.error}`);
            }
        } catch (err) {
            toast.error("An unexpected error occurred while sending the message.");
        } finally {
            setIsSending(false);
            setButtonLabel('Send'); // Reset button text after sending
            setRemainingTime(0); // Reset remaining time
        }
    };

    const convertToMilliseconds = (delay: string, unit: string) => {
        const time = Number(delay);
        if (unit === 'seconds') {
            return time * 1000; // Convert seconds to milliseconds
        } else if (unit === 'minutes') {
            return time * 60000; // Convert minutes to milliseconds
        } else if (unit === 'hours') {
            return time * 3600000; // Convert hours to milliseconds
        }
        return 0;
    }

    const isDisabled = !delay || !message || !webhookUrl || isSending

    return (
        <div className="space-y-4">
            <div>
                <Label>Delay</Label>
                <div className="flex space-x-2">
                    <Input
                        type="number"
                        min="0"
                        value={delay}
                        onChange={(e) => setDelay(e.target.value)}
                        placeholder="Enter delay"
                    />
                    <select
                        className="border rounded px-2 py-1"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="seconds">seconds</option>
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                    </select>
                </div>
            </div>

            <div>
                <Label>Slack Message</Label>
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello from Keanu!"
                />
            </div>

            <div>
                <Label>Slack Webhook URL</Label>
                <Input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/..."
                />
            </div>

            <Button
                onClick={handleSend}
                disabled={isDisabled}
                className={cn({ 'opacity-50': isDisabled })}
            >
                {isSending ? `Sending in ${remainingTime} seconds` : buttonLabel}
            </Button>
        </div>
    )
}

export default DelayForm
