# ShopMini Project

## Phân chia dữ liệu (useState, Context hay Redux và lý do):

1. **useState (Local State):**
   - **Ô tìm kiếm (searchTerm)** tại trang chủ: Trạng thái mang tính cục bộ, chỉ phục vụ việc lọc danh sách hiển thị trên trang chủ nên dùng `useState`.
   - **Trạng thái form đăng nhập (username, password, error)** tại `LoginPage`: Chỉ dùng trong phạm vi trang đăng nhập.
   - **Trạng thái thông báo thành công** tại `CheckoutPage`.

2. **Context API:**
   - **ThemeContext (Theme sáng/tối):** Cần chia sẻ trạng thái giao diện xuyên suốt toàn ứng dụng từ Header đến các trang, thay đổi toàn cục nền app mà không cần truyền prop qua nhiều tầng component.
   - **AuthContext (Xác thực người dùng):** Quản lý thông tin đăng nhập, đăng xuất (`user`, `login`, `logout`) để dùng chung cho việc kiểm tra phân quyền (Protected Route) và hiển thị tên người dùng ở Header.

3. **Redux Toolkit:**
   - **productsSlice:** Quản lý danh sách sản phẩm lấy từ API bất đồng bộ (`createAsyncThunk`), lưu trữ trạng thái loading/succeeded/failed để tái sử dụng ở nhiều trang.
   - **cartSlice:** Quản lý giỏ hàng toàn cục (thêm, xoá, sửa số lượng sản phẩm, xoá giỏ hàng sau khi đặt hàng thành công) vì dữ liệu giỏ hàng cần hiển thị số lượng ở Header, xử lý ở CartPage và đồng thời xoá ở CheckoutPage.