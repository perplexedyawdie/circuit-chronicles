import React, { useState, useEffect, useRef, useCallback, useContext, useLayoutEffect } from 'react'
import ReactGlobe, { GlobeMethods } from 'react-globe.gl'
// @ts-ignore
import earthMarble from '../assets/earth-blue-marble.jpg'
// @ts-ignore
import nightSky from '../assets/night-sky.png'
import CircuitContext from '../context/CircuitContext'
import circuitLocations from '../data/circuitLocation.json'

interface MarkerData {
    lat: number,
    lng: number,
    size: number,
    color: string,
    emoji: string,
    circuitName: string
}

interface CircuitLocation {
    Round: number,
    raceDate: string,
    gpName: string,
    country: string,
    city: string,
    circuitName: string,
    lat: number,
    lng: number,
    coordinates: string,
    flag: string
}

const ARC_REL_LEN = 0.4; // relative to whole arc
const FLIGHT_TIME = 1000;
const NUM_RINGS = 3;
const RINGS_MAX_R = 5; // deg
const RING_PROPAGATION_SPEED = 5; // deg/sec

function Globe() {
    const globeRef = useRef<GlobeMethods | undefined>(undefined)
    const layoutRf = useRef<HTMLDivElement>(null);
    const { data } = useContext(CircuitContext)
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (layoutRf.current) {
            setWidth(layoutRf.current.offsetWidth);
        }
    }, []);
    const gData: MarkerData[] = circuitLocations.map((loc) => ({
        lat: loc.lat,
        lng: loc.lng,
        size: 7 + Math.random() * 30,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        emoji: loc.flag,
        circuitName: loc.circuitName
    }));

    useEffect(() => {
        if (globeRef) {
            globeRef.current?.pointOfView({
                lat: circuitLocations[0].lat,
                lng: circuitLocations[0].lng,
                altitude: 2.5
            })
        }
    }, [])

    const [arcsData, setArcsData] = useState([]);
    const [ringsData, setRingsData] = useState([]);
    const [circuitIdx, setCircuitIdx] = useState<number>(0)

    function handleNextBtnClick() {
        setCircuitIdx(prevIdx => prevIdx + 1 <= (circuitLocations.length - 1) ? (prevIdx + 1) : 0)
    }

    function handlePrevBtnClick() {
        setCircuitIdx(prevIdx => prevIdx - 1 >= 0 ? (prevIdx - 1) : (circuitLocations.length - 1))
    }

    const prevCoords = useRef({ lat: circuitLocations[0].lat, lng: circuitLocations[0].lng });
    // @ts-ignore
    const emitArc = useCallback(({ lat: endLat, lng: endLng }) => {
        const { lat: startLat, lng: startLng } = prevCoords.current;
        prevCoords.current = { lat: endLat, lng: endLng };

        // add and remove arc after 1 cycle
        const arc = { startLat, startLng, endLat, endLng };
        // @ts-ignore
        setArcsData(curArcsData => [...curArcsData, arc]);
        setTimeout(() => setArcsData(curArcsData => curArcsData.filter(d => d !== arc)), FLIGHT_TIME * 2);

        // add and remove start rings
        const srcRing = { lat: startLat, lng: startLng };
        // @ts-ignore
        setRingsData(curRingsData => [...curRingsData, srcRing]);
        setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== srcRing)), FLIGHT_TIME * ARC_REL_LEN);

        // add and remove target rings
        setTimeout(() => {
            const targetRing = { lat: endLat, lng: endLng };
            // @ts-ignore
            setRingsData(curRingsData => [...curRingsData, targetRing]);
            setTimeout(() => setRingsData(curRingsData => curRingsData.filter(r => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
        }, FLIGHT_TIME);
        globeRef.current?.pointOfView({
            lat: endLat,
            lng: endLng,
            altitude: 1
        })
    }, []);

    useEffect(() => {
        if (globeRef) {
            let circuitCoords = {
                lat: circuitLocations[circuitIdx].lat,
                lng: circuitLocations[circuitIdx].lng
            }
            emitArc(circuitCoords)
            data.setCurrentCircuit(circuitIdx)

        }
    }, [circuitIdx])


    return (
        <div ref={layoutRf} className="w-full flex justify-center items-center flex-col space-y-4">
            <ReactGlobe
                ref={globeRef}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl={earthMarble}
                backgroundImageUrl={nightSky}
                width={width}
                height={width/ (4/3)}
                htmlElementsData={gData}
                htmlElement={(d) => {
                    const el: HTMLDivElement = document.createElement('div');
                    // @ts-ignore
                    el.innerHTML = d?.emoji;
                    el.style['pointerEvents'] = 'auto';
                    el.style.cursor = 'pointer';
                    el.onclick = () => console.info(d);
                    return el;
                }}
                // onGlobeClick={emitArc}
                arcsData={arcsData}
                arcColor={() => 'darkOrange'}
                arcDashLength={ARC_REL_LEN}
                arcDashGap={2}
                arcDashInitialGap={1}
                arcDashAnimateTime={FLIGHT_TIME}
                arcsTransitionDuration={0}
                ringsData={ringsData}
                // @ts-ignore
                ringColor={() => t => `rgba(255,100,50,${1 - t})`}
                ringMaxRadius={RINGS_MAX_R}
                ringPropagationSpeed={RING_PROPAGATION_SPEED}
                ringRepeatPeriod={FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS}
            />
            <div>
            <p className="font-semibold">{circuitLocations[circuitIdx].circuitName}</p>
            </div>
            <div className="btn-group max-w-md flex justify-between items-center space-x-4">
                <button onClick={(e) => handlePrevBtnClick()} className="btn">Prev</button>
                <button onClick={(e) => handleNextBtnClick()} className="btn">Next</button>
            </div>
        </div>
    )
}

export default Globe