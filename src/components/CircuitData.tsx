import React, { useContext, useEffect, useState } from 'react'
import CircuitContext from '../context/CircuitContext'
import australia from '../assets/australia.png'
import bahrain from '../assets/bahrain.png'
import baku from '../assets/baku.png'
import barcelona from '../assets/barcelona.png'
import british from '../assets/british-gp.png'
import canada from '../assets/canada.png'
import italy from '../assets/italy-imola.png'
import miami from '../assets/miami.png'
import monaco from '../assets/monaco.png'
import jeddah from '../assets/saudi-arabia-jeddah.png'
import raceResults from '../data/raceResults.json'
import circuitLocations from '../data/circuitLocation.json'
const bgs = [
    australia,
    bahrain,
    baku,
    barcelona,
    british,
    canada,
    italy,
    miami,
    monaco,
    jeddah
]

interface RaceResult {
    "Round": number;
    "Track": string;
    "Position": number;
    "No": number;
    "Driver": string;
    "Team": string;
    "startingGrid": number;
    "Time/Retired": string;
    "Points": number;
    "+1 Pt": string;
    "Fastest Lap": string;
}
function CircuitData() {
    const { data } = useContext(CircuitContext)
    const [bg, setBg] = useState<number>(0)
    const [raceRound, setRaceRound] = useState<number>(1)
    const [raceResult, setRaceResult] = useState<RaceResult[]>([])

    useEffect(() => {
        console.log(data.currentCircuit, "data.currentCircuit")
        let bgIdx = Math.floor(Math.random() * ((bgs.length - 1) - 0 + 1)) + 0;
        setBg(bgIdx)
        setRaceRound(circuitLocations[data.currentCircuit].Round)
        setRaceResult(raceResults.filter((res) => res.Round == circuitLocations[data.currentCircuit].Round))
    }, [data.currentCircuit])


    return (
        <div className="card full bg-base-100 shadow-xl image-full">
            <figure><img className="object-cover w-full transition-all ease-in duration-700 opacity-100" src={bgs[bg]} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title"><div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": (Math.round((raceRound / 22) * 100)) }}>{(Math.round((raceRound / 22) * 100))}%</div></h2>
                <h1 className="font-bold text-6xl mb-12">Race Facts</h1>
                <div className="flex flex-col justify-center items-center space-y-8">
                    <div className="card w-full glass">
                        <div className="card-body">
                            <h2 className="font-thin text-center">🥇 First 🥇</h2>
                            <p className="font-semibold text-2xl">{raceResult.find((res) => res.Position == 1)?.Driver}</p>
                            <div className="card-actions justify-center">
                                <div className="stats stats-vertical lg:stats-horizontal shadow">
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Team</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 1)?.Team}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starting Position</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 1)?.startingGrid}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Fastest Lap</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 1)?.['Fastest Lap']}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card w-full glass">
                        <div className="card-body">
                            <h2 className="font-thin text-center">🥈 Second 🥈</h2>
                            <p className="font-semibold text-2xl">{raceResult.find((res) => res.Position == 2)?.Driver}</p>
                            <div className="card-actions justify-center">
                                <div className="stats stats-vertical lg:stats-horizontal shadow">
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Team</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 2)?.Team}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starting Position</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 2)?.startingGrid}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Fastest Lap</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 2)?.['Fastest Lap']}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card w-full glass">
                        <div className="card-body">
                            <h2 className="font-thin text-center">🥉 Third 🥉</h2>
                            <p className="font-semibold text-2xl">{raceResult.find((res) => res.Position == 3)?.Driver}</p>
                            <div className="card-actions justify-center">
                                <div className="stats stats-vertical lg:stats-horizontal shadow">
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Team</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 3)?.Team}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Starting Position</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 3)?.startingGrid}</div>
                                    </div>
                                    <div className="stat place-items-center">
                                        <div className="stat-title">Fastest Lap</div>
                                        <div className="stat-value">{raceResult.find((res) => res.Position == 3)?.['Fastest Lap']}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
    )
}

export default CircuitData