import { existsSync } from "fs";
import { resolve } from "path";

export function getEnvPath(dest: String): string {
    const env: string | undefined = process.env.NODE_ENV;
    const fallback: string = resolve(`${dest}/.env`);
    const filename: string = env ? `${env}.env` : 'development.env';
    let filepath: string = resolve(`${dest}/${filename}`);

    if(!existsSync(filepath))
    {
        filepath = fallback;
    }

    return filepath;
}