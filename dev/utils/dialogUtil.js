export function showConfirmDialog(header, message, proceedTxt, cancelTxt, onConfirm, onCancel) {
    const dialog = document.createElement('div');
    dialog.classList.add('overlay');
    dialog.innerHTML = `
        <div class="dialog">
            <div class="dialog-header">
                <span>${header}</span>
                <button id="close-btn">X</button>
            </div>
            <p class="dialog-message">${message}</p>
            <div class="actions">
                <button id="confirm-btn">${proceedTxt}</button>
                <button id="cancel-btn">${cancelTxt}</button>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .dialog {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 350px;
            text-align: center;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            font-family: Arial, sans-serif;
        }
        .dialog-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            color: #ff6d00;
            margin-bottom: 10px;
        }
        .dialog-header #close-btn {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #ff6d00;
        }
        .dialog-message {
            font-size: 16px;
            color: #333;
            margin-bottom: 20px;
            border: none;
        }
        .actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #confirm-btn {
            background-color: #ff6d00;
            color: white;
            padding: 12px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }
        #cancel-btn {
            background: white;
            color: #666;
            font-size: 16px;
            padding: 8px;
            cursor: pointer;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        #cancel-btn:hover {
            color: #333;
            border-color: #999;
        }
    `;
    document.head.appendChild(style);

    dialog.querySelector('#confirm-btn').addEventListener('click', () => {
        onConfirm();
        document.body.removeChild(dialog);
    });

    dialog.querySelector('#cancel-btn').addEventListener('click', () => {
        onCancel();
        document.body.removeChild(dialog);
    });

    dialog.querySelector('#close-btn').addEventListener('click', () => {
        onCancel();
        document.body.removeChild(dialog);
    });

    document.body.appendChild(dialog);
}
