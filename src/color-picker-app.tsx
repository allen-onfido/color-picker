import { useCallback, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import './color-picker-app.css';

function ColorPickerApp() {
  const [color, setColor] = useState('#000000');
  const [disabled, setDisabled] = useState(false);

  /* Send message to host app that the mfe is ready to accept values*/
  const sendReadyMessage = useCallback(() => {
    window?.parent.postMessage({ type: 'mfe.ready', payload: { style: { height: '340px' } } }, '*');
  }, []);
  useEffect(sendReadyMessage, [sendReadyMessage]);

  /* handle messages sent from the host */
  useEffect(() => {
    const handleMessage = (msg: MessageEvent) => {
      const { data: action } = msg;

      if (action.type === 'host.setState') {
        const { payload } = action;

        if (color !== payload.value) {
          setColor(payload.value || '#000000');
        }

        if (payload.disabled === false || payload.disabled === true) {
          setDisabled(payload.disabled);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [color, setColor]);

  const handleColorChange = useCallback(
    (value: string) => {
      if (disabled) {
        return;
      }

      setColor(value);
      window?.parent.postMessage({ type: 'mfe.setState', payload: { value } }, '*');
    },
    [disabled, setColor],
  );

  return (
    <div className="App">
      <HexColorPicker color={color} onChange={handleColorChange} />

      <input type="text" value={color} onChange={(e) => handleColorChange(e.target.value)} />

      <div className="value">Current color is {color}</div>
      <div className="value">{disabled ? 'Disabled' : 'Enabled'}</div>
    </div>
  );
}

export default ColorPickerApp;
