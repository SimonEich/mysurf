'use client';
import Link from 'next/link';
import Geocoding_Map from './geocoding_map';
import Geocoding from './geocoding';


export default function SearchSpot(){
    return (<div>
        <p>
            SearchSpot
        </p>
        <Geocoding/>

    </div>
    );
}