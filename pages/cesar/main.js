document.getElementById('cypher-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const key = parseInt(document.getElementById('key').value, 10);
    const text = document.getElementById('text').value;
    const result = caesarCypher(text, key);

    document.getElementById('result').textContent = result;
});

function caesarCypher(text, key) {
    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = char >= 'a' ? 97 : 65;
            return String.fromCharCode(((code - base + key) % 26) + base);
        }
        return char;
    }).join('');
}