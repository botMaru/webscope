import React, {useState, useEffect} from 'react';
import PopUpWindow from './PopUpWindow';
import { getNumActiveChannels } from './Utils';

export default function AppMenu({captureData, captureConfig, resetView, resetSettings}) {
    const [appMenuActive, setAppMenuActive] = useState(false);

    function saveCsv(captureData, captureConfig) {

    
        let csv = [];
        for (let i = 0; i < captureConfig.captureDepth; i++) {
            for (let channel = 0; channel < 3; channel++) {
                if (captureConfig.activeChannels[channel]) {
                    csv.push((captureData[channel][i] * 3.3 / 4095).toFixed(4));
                    csv.push(", ");
                }
            }
            csv.push((1000 * i / (captureConfig.sampleRate / getNumActiveChannels(captureConfig))).toFixed(3));
            csv.push(",\n");
        }
    
        // Remove trailing comma
        csv.pop();
        csv.push("\n");
    
        // file object
         const file = new Blob(csv, {type: 'text/plain'});
     
    
         
        // anchor link
         const element = document.createElement("a");
         element.href = URL.createObjectURL(file);
         element.download = "capture.csv";
     
         // simulate link click
         document.body.appendChild(element); // Required for this to work in FireFox
         element.click();
    }

    return(
        <div className="flex-grow flex-1">
            <div className='flex-1 text-center my-[1px]   hover:bg-slate-200 hover:text-slate-900 active:bg-slate-300'></div>
            <button className="mx-1 my-1 py-[1px] pointer-events-auto w-[124px]  bg-slate-100 rounded-md text-l leading-5 text-slate-700 border border-slate-400 shadow" onClick={() => setAppMenuActive(true)}>Menu</button>

            <PopUpWindow active={appMenuActive} setActive={setAppMenuActive} >
                <ul className='list-disc px-5'>
                    <li><a href="https://github.com/botmaru/webscope" target="_blank" rel="noreferrer">About</a></li>
                    <li><a href="webscope_manual.pdf" target="_blank" rel="noreferrer">User manual</a></li>
                    <li><a href="rp2040_webscope.uf2" download>Raspberry Pi Pico (RP2040)</a></li>
                    <li><a href="rp2350_webscope.uf2" download>Raspberry Pi Pico 2 (RP2350)</a></li>
                    <li><a href="https://github.com/botmaru/webscope/archive/refs/heads/main.zip">Get offline version</a></li>
                    <li className="cursor-pointer" onClick={() => { resetView(); setAppMenuActive(false); }}>Reset view</li>
                    <li className="cursor-pointer" onClick={() => { resetSettings(); setAppMenuActive(false); }}>Reset all settings</li>
                    <li className="cursor-pointer" onClick={() => saveCsv(captureData, captureConfig)}>Download capture (csv)</li>
                </ul>
            </PopUpWindow>
        </div>
    );
}

