<template>
  <div class="pagination">
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="goToPage(pageNumber)"
      :class="{ active: currentPage === pageNumber }"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { defineEmits } from "vue";
const props = defineProps({
  totalItems: Number,
  currentPage: Number,
});
const emit = defineEmits(["page-change"]);
const totalPages = Math.ceil(props.totalItems / 12); // 12 items per page

const goToPage = (pageNumber) => {
  emit("page-change", pageNumber);
};
</script>

<style>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
  border: none;
}
</style>
