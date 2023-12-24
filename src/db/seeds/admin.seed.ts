import { disconnect } from 'mongoose';
import { AdminModel } from '../../Models/Admin/schema';
import { adminData } from './data';
import { connectToDatabase } from '../../database';

async function seedAdmins() {
  try {
    await connectToDatabase();
    for (const admin of adminData) {
      await AdminModel.create(admin);
      console.log(`Admin seeded: ${admin.email}`);
    }
  } catch (error) {
    console.error('Error seeding admins:', error);
  } finally {
    disconnect();
  }
}

seedAdmins();
