<template>
    <div class="container mt-4">
      <!-- หัวข้อของตาราง -->
      <h2 class="mb-3">User List</h2>

      <!-- ตารางแสดงข้อมูลผู้ใช้ -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>USERNAME</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <!-- ใช้ v-for เพื่อวนลูปแสดงข้อมูลผู้ใช้แต่ละคน -->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name}} </td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address.city }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      users: [] // เก็บข้อมูลผู้ใช้ที่ดึงมาจาก API
    };
  },
  mounted() {
    // เรียกใช้เมทอด fetchUsers() ทันทีเมื่อคอมโพเนนต์ถูกโหลด
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // ใช้ fetch() เพื่อดึงข้อมูลผู้ใช้จาก API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // แปลงข้อมูล JSON และบันทึกลงในตัวแปร users
        this.users = await response.json();
      } catch (error) {
        // แสดงข้อผิดพลาดทาง console หากเกิดปัญหาในการดึงข้อมูล
        console.error('Error fetching users:', error);
      }
    }
  }
};
</script>


