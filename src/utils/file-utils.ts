const base64EncodeFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error('Failed to read file'));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};

export { base64EncodeFile };
