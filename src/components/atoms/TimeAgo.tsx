import { getTimeAgo } from "../../lib/timeAgo"

interface TimeAgoProps {
    timestamp: string
}

export function TimeAgo ({ timestamp }: TimeAgoProps) {
    let timeAgo = ''
    if (timestamp) {
        const timePeriod = getTimeAgo(timestamp)
        timeAgo += timePeriod
    }
    return (
        <time dateTime={timestamp} title={timestamp}>&nbsp; <i>{timeAgo}</i></time>
    )
}