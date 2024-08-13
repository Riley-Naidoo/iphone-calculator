document.querySelectorAll('.brow div').forEach(element => {
    // Store the initial background color
    const originalColor = window.getComputedStyle(element).backgroundColor;

    element.addEventListener('click', () => {
        // Change the background color on click
        element.style.backgroundColor = '#f1f1f17e';

        // Use setTimeout to revert to the original color after 0.8s
        setTimeout(() => {
            element.style.backgroundColor = originalColor; // Revert to the original color
        }, 200); // 800 milliseconds = 0.8 seconds
    });
});

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    timeElement.textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);


let currentInput = '';
        let previousInput = '';
        let operation = '';

        function formatNumber(num) {
            if (num === '') return '';
            // Convert number to scientific notation if too large
            if (Math.abs(num) > 999999999) {
                return Number(num).toExponential(3);
            }
            // Add thousand separators
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        function handleButtonClick(event) {
            document.getElementById('AC').textContent="C";

            const buttonValue = event.target.id;
            const equationElement = document.getElementById('equation');
            let displayValue = equationElement.textContent.replace(/,/g, ''); // Remove commas for calculation

            if (buttonValue >= '0' && buttonValue <= '9') {
                // Handle number input
                if (displayValue === '0' || displayValue === '') {
                    displayValue = buttonValue;
                } else {
                    displayValue += buttonValue;
                }
                // Limit the input to 9 digits
                if (displayValue.replace(/\./g, '').length > 9) {
                    return; // Do not accept more than 9 digits
                }
                equationElement.textContent = formatNumber(displayValue);
            } else if (buttonValue === '.') {
                // Handle decimal point input
                if (!displayValue.includes('.')) {
                    displayValue += '.';
                    equationElement.textContent = formatNumber(displayValue);
                }
            } else if (['+', '-', '*', '/'].includes(buttonValue)) {
                // Handle operator buttons
                previousInput = displayValue;
                operation = buttonValue;
                equationElement.textContent = ''; // Clear display for the next input
            } else if (buttonValue === '=') {
                // Handle equal button
                const result = evaluateExpression(previousInput, operation, displayValue);
                equationElement.textContent = formatNumber(result);
                previousInput = '';
                operation = '';
            } else if (buttonValue === '±') {
                // Handle sign toggle
                if (displayValue) {
                    displayValue = (parseFloat(displayValue) * -1).toString();
                    equationElement.textContent = formatNumber(displayValue);
                }
            } else if (buttonValue === '%') {
                // Handle percentage
                const currentValue = parseFloat(displayValue);
                const result = currentValue / 100;
                equationElement.textContent = formatNumber(result);
            } else if (buttonValue === 'AC') {
                // Handle clear button
                equationElement.textContent = '';
                previousInput = '';
                operation = '';
            }
        }

        function evaluateExpression(a, op, b) {
            const num1 = parseFloat(a);
            const num2 = parseFloat(b);
            switch (op) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return num1 / num2;
                default:
                    return 0;
            }
        }

        // Add event listeners to all buttons
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
        document.getElementById('AC').addEventListener('click',()=>{
            document.getElementById('equation').textContent = 0;
            document.getElementById('AC').textContent = "AC";
        })







