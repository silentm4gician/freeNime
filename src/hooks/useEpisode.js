import useFetch from "./useFetch"

export default function useEpisode(epID, watching) {
    const list = useFetch(`watch/${epID}`)
    const ep = list?.sources.find(obj => obj.quality.includes('default'))

    const index = epID.lastIndexOf('-')
    const findEp = epID.substring(index + 1)

    const prevEp = Number(findEp) - 1
    const prev = `${watching}-episode-${prevEp}`

    const nextEp = Number(findEp) + 1
    const next = `${watching}-episode-${nextEp}`

    const anime = useFetch(`info/${watching}`)
    const episodes = anime?.totalEpisodes
    const download = list?.download
    const title = `${anime?.title} episode ${findEp}`

    return { title, prev, next, episodes, ep, download }
}