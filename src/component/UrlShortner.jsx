import { useState, useRef } from 'react'
import "./Url.css"

export default function UrlShortner() {
    const [formData, setFormData] = useState({
        longUrl: '',
        shortUrl: ''
    })
    const textRef = useRef(null)
    const handelOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        const { longUrl } = formData;

        const response = await fetch('https://url-k7k2.onrender.com/url/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longUrl })
        })
        const answer = await response.json();
        setFormData({
            url: "",
            shortUrl: JSON.stringify(answer.data.shortUrl)
        })

    }
    const handelOnClick = async (e) => {
        if (e.target.value === "clear") {
            setFormData({
                longUrl: "",
                shortUrl: ""
            })
        }
    }

    const handleRedirect =() => {
        const url = formData.shortUrl
        if (url) {
            window.open(JSON.parse(formData.shortUrl), '_blank')
        } else {
            alert("Url Not Generated")
        }
    };
    const handleCopy = async () => {
        try {
            const textToCopy = textRef.current.innerText;
            if (textToCopy) {
                await navigator.clipboard.writeText(JSON.parse(formData.shortUrl));
                // Provide some visual feedback to the user (optional)
                alert('Text Copied!');
            }
        } catch (err) {
            alert('Failed to copy text:', err);
        }
    };
    return (
        <>
            <h1>Url Shortner/Compressor</h1>
            <hr></hr>
            <form onSubmit={handelSubmit}>
                <div className='input-container'>
                    <input type="url" name="longUrl" placeholder="Enter your Long URL" value={formData.url} onChange={handelOnChange} required />
                    <button className="button" type="submit">Shorten</button>
                </div>
            </form>
            <h2>Short URL</h2>
            <p className='short'>{formData.shortUrl}</p>
            <div className='Buttons2' ref={textRef}>
                <button type='copy' onClick={handleCopy} value='copy'><span>
                    <svg
                        viewBox="0 0 467 512.22"
                        clipRule="evenodd"
                        fillRule="evenodd"
                        imageRendering="optimizeQuality"
                        textRendering="geometricPrecision"
                        shapeRendering="geometricPrecision"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#0E418F"
                        height={12}
                        width={12}
                    >
                        <path
                            d="M131.07 372.11c.37 1 .57 2.08.57 3.2 0 1.13-.2 2.21-.57 3.21v75.91c0 10.74 4.41 20.53 11.5 27.62s16.87 11.49 27.62 11.49h239.02c10.75 0 20.53-4.4 27.62-11.49s11.49-16.88 11.49-27.62V152.42c0-10.55-4.21-20.15-11.02-27.18l-.47-.43c-7.09-7.09-16.87-11.5-27.62-11.5H170.19c-10.75 0-20.53 4.41-27.62 11.5s-11.5 16.87-11.5 27.61v219.69zm-18.67 12.54H57.23c-15.82 0-30.1-6.58-40.45-17.11C6.41 356.97 0 342.4 0 326.52V57.79c0-15.86 6.5-30.3 16.97-40.78l.04-.04C27.51 6.49 41.94 0 57.79 0h243.63c15.87 0 30.3 6.51 40.77 16.98l.03.03c10.48 10.48 16.99 24.93 16.99 40.78v36.85h50c15.9 0 30.36 6.5 40.82 16.96l.54.58c10.15 10.44 16.43 24.66 16.43 40.24v302.01c0 15.9-6.5 30.36-16.96 40.82-10.47 10.47-24.93 16.97-40.83 16.97H170.19c-15.9 0-30.35-6.5-40.82-16.97-10.47-10.46-16.97-24.92-16.97-40.82v-69.78zM340.54 94.64V57.79c0-10.74-4.41-20.53-11.5-27.63-7.09-7.08-16.86-11.48-27.62-11.48H57.79c-10.78 0-20.56 4.38-27.62 11.45l-.04.04c-7.06 7.06-11.45 16.84-11.45 27.62v268.73c0 10.86 4.34 20.79 11.38 27.97 6.95 7.07 16.54 11.49 27.17 11.49h55.17V152.42c0-15.9 6.5-30.35 16.97-40.82 10.47-10.47 24.92-16.96 40.82-16.96h170.35z"
                            fillRule="nonzero"
                        />
                    </svg>{" "}
                    Copy link
                </span>
                </button>
                <button className="button5" type="clear" onClick={handelOnClick} value="clear"> <svg viewBox="0 0 448 512" className="svgIcon">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg></button>
                <hr />
                <button className='btn' type="redirect" onClick={handleRedirect} value="redirect">
                    <svg
                        height={24}
                        width={24}
                        fill="#FFFFFF"
                        viewBox="0 0 24 24"
                        data-name="Layer 1"
                        id="Layer_1"
                        className="sparkle"
                    >
                        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z" />
                    </svg>
                    <div className="text">Redirect</div>
                </button>
            </div>
        </>
    )
}
