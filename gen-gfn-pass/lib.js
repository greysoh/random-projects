export default {
    /**
     * Execute a command then return the status
     * @param {string} cmd - The command to execute 
     * @returns {string} - The status of the command
     */
    "runShell": async function(cmd) {
        return new Promise(async (resolve, reject) => {
            const p = Deno.run({
                cmd: cmd.split(" ")
            });
    
            const code = await p.status();
    
            resolve(code);
        });
    },
    /**
     * Joins a file path
     * @param  {...string} args Text to join
     * @returns {string} Joined file path
     */
    "join": async function(...args) {
        let argv = [];
        
        for await (let arg of args) {
            if (arg == "..") {
                delete argv[argv.length - 1];
            } else if (arg.endsWith("\\") || arg.endsWith("/")) {
                argv.push(arg.slice(0, -1));
            } else if (arg.startsWith("\\") || arg.startsWith("/")) {
                argv.push(arg);
            } else {
                argv.push(arg);
            }
        }

        if (Deno.build.os == "windows") return argv.join("\\");
        return argv.join("/");
    },
    /**
     * Gets a utf-8 file and returns its content
     * @param {string} url The URL of the file to read
     * @param {string} method The HTTP method to use
     * @param {string} body The body of the request
     * @returns {string} The content of the file
     */
    "fetch": async function(url, method, body) {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body)
        });
        const text = await response.text();
        return text;
    },
    /**
     * Gets the users home directory
     * @returns {string} The user's home directory
     */
    "getHomeDir": function() {
        return Deno.env.get("HOME") || Deno.env.get("HOMEPATH") || Deno.env.get("USERPROFILE");
    },
    /**
     * Gets the system's temporary directory
     * @returns {string} The system's temporary directory
     */
    "tempDir": function() {
        return Deno.env.get("TEMP") || "/tmp"
    },
    /**
     * Checks if a file or folder exists
     * @param {string} item The item to check 
     * @returns {boolean} True if the item exists, false otherwise
     */
    "existsAsync": async function(item) {
        try {
            await Deno.stat(item);
            return true;
        } catch (e) {
            return false;
        }
    },
    "sleep": async function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}