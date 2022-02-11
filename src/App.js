import React, { useEffect, useState } from 'react';
import Editor from './components/Editor';
import './app.css'
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {

    const [html, setHtml] = useLocalStorage('html', '')
    const [css, setCss] = useLocalStorage('css', '')
    const [js, setJs] = useLocalStorage('js', '')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `)
        }, 250);
        return () => clearTimeout(timeout)
    }, [html, css, js])

    return (
        <>
            <div className='app'>
                <div className='pane top-pane'>
                    <Editor
                        displayName="HTML"
                        language="xml"
                        value={html}
                        onChange={setHtml}
                    />
                    <Editor
                        displayName="CSS"
                        language="css"
                        value={css}
                        onChange={setCss}
                    />
                    <Editor
                        displayName="Javascript"
                        language="javascript"
                        value={js}
                        onChange={setJs}
                    />
                </div>
                <div className='pane bottom-pane'>
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox='allow-scripts'
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    />
                </div>
            </div>
        </>
    )
};
export default App;
