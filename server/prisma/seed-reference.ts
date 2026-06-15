import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const clusterCount = await prisma.cluster.count();
    if (clusterCount === 0) {
        await prisma.cluster.createMany({
            data: [
                { name: 'Lagos Cluster', description: 'Projects in Lagos region' },
                { name: 'Abuja Cluster', description: 'Projects in Abuja / FCT region' },
                { name: 'Port Harcourt Cluster', description: 'Projects in Rivers region' },
                { name: 'Kano Cluster', description: 'Projects in Kano region' },
            ],
            skipDuplicates: true,
        });
        console.log('Seeded clusters.');
    } else {
        console.log(`Clusters already present (${clusterCount}). Skipping.`);
    }

    const equipmentCount = await prisma.equipment.count();
    if (equipmentCount === 0) {
        await prisma.equipment.createMany({
            data: [
                { name: 'Excavator (20 ton)', category: 'Earthwork', defaultInternalCostPerDay: 120000, status: 'Available' },
                { name: 'Bulldozer D6', category: 'Earthwork', defaultInternalCostPerDay: 180000, status: 'Assigned' },
                { name: 'Concrete Mixer (1m³)', category: 'Concreting', defaultInternalCostPerDay: 45000, status: 'Available' },
                { name: 'Concrete Pump', category: 'Concreting', defaultInternalCostPerDay: 95000, status: 'Available' },
                { name: 'Tower Crane (50m)', category: 'Lifting', defaultInternalCostPerDay: 250000, status: 'Assigned' },
                { name: 'Mobile Crane (25 ton)', category: 'Lifting', defaultInternalCostPerDay: 180000, status: 'Available' },
                { name: 'Generator (100 KVA)', category: 'Generators / Power', defaultInternalCostPerDay: 35000, status: 'Available' },
                { name: 'Dump Truck (20 ton)', category: 'Transport', defaultInternalCostPerDay: 75000, status: 'Available' },
            ],
        });
        console.log('Seeded equipment.');
    } else {
        console.log(`Equipment already present (${equipmentCount}). Skipping.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
