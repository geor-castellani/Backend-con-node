
// Cargando librerías
const readline = require("readline");

// Cargando modules
const Advertisement = require("./models/Advertisement");

async function main() {
    // Solicitar confirmación para eliminar todo el contenido de la base de datos
    const confirmed = await askConfirmRemoval("Are you sure you want to delete all content from the database? [n] ('yes' to confirm)")
    if (!confirmed) {
        process.exit();
    }

    // Conexión a la base de datos
    const connection = require("./lib/connectMongoose");

    // Inicializar los anuncios
    await initAdvertisements();

    // Desconectarse de la base de datos
    connection.close();
}

main().catch(err => console.log("There was an error", err));

async function initAdvertisements(){
    const result = await Advertisement.deleteMany();
    console.log(`${result.deletedCount} advertisements removed`);

    const inserted = await Advertisement.insertMany([
        {
            name: "Classic bicycle",
            forSale: true,
            price: 230.50,
            image: "bicycle.jpg",
            tags: ["lifestyle", "motor"]
        },
        {
            name: "iPhone 14",
            forSale: false,
            price: 850.00,
            image: "iphone14.jpg",
            tags: ["lifestyle", "mobile"]
        },
        {
            name: "Gaming chair",
            forSale: true,
            price: 110.00,
            image: "gaming-chair.jpg",
            tags: ["lifestyle", "work"]
        }
    ]);
    console.log(`${inserted.length} new advertisements created.`);
}

function askConfirmRemoval(text){
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(text, answer => {  
            interface.close();
            if(answer.toLowerCase() === "yes") {
                resolve(true);
                return;
            }
            resolve(false);
        });
    });
};