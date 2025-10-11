# Layout Structure

## 📁 Cấu trúc Layout

Dự án đã được chia thành 2 layout riêng biệt:

### 1. **UserLayout** - Layout cho người dùng

- **File**: `src/layouts/UserLayout.tsx`
- **Routes**: `/`, `/home`, `/my-list`, `/movie/:id`, `/watch/:id`
- **Đặc điểm**:
  - Có Header với navigation
  - Giao diện Netflix tiêu chuẩn
  - Toàn màn hình với nội dung streaming

### 2. **AdminLayout** - Layout cho quản trị viên

- **File**: `src/layouts/AdminLayout.tsx`
- **Routes**: `/admin`, `/admin/movies`, `/admin/users`, `/admin/settings`
- **Đặc điểm**:
  - Sidebar navigation bên trái (w-64)
  - Menu items: Dashboard, Movies, Users, Settings
  - Logo "Netflix Admin" màu đỏ
  - Nút Logout ở cuối sidebar
  - Nội dung chính bên phải có thể scroll

## 🎨 Hero Banner Buttons

Đã fix kích thước nút "Xem ngay" và "Chi tiết":

- **Thay đổi**: `min-w-[160px]` → `w-[180px]`
- **Kết quả**: 2 nút có cùng kích thước cố định 180px
- **File**: `src/components/layout/HeroContent.tsx`

## 🚀 Cách sử dụng

### Truy cập User Interface:

```
http://localhost:5173/
http://localhost:5173/home
http://localhost:5173/my-list
http://localhost:5173/movie/1
```

### Truy cập Admin Interface:

```
http://localhost:5173/admin          → Dashboard
http://localhost:5173/admin/movies   → Movies Management
http://localhost:5173/admin/users    → Users Management
http://localhost:5173/admin/settings → Settings
```

## 📊 Admin Dashboard

Trang admin dashboard bao gồm:

- **Stats Cards**: 4 card thống kê (Movies, Users, Watch Time, Revenue)
- **Recent Activity**: Danh sách hoạt động gần đây
- **Icons**: Sử dụng Lucide React
- **Animations**: Framer Motion với stagger effect

## 🎯 Cấu trúc thư mục

```
src/
├── layouts/
│   ├── UserLayout.tsx    # Layout người dùng (có Header)
│   ├── AdminLayout.tsx   # Layout admin (có Sidebar)
│   └── index.ts          # Export layouts
├── pages/
│   ├── Home/            # Trang chủ user
│   ├── MyList/          # Danh sách của tôi
│   ├── MovieDetail/     # Chi tiết phim
│   ├── VideoPlayer/     # Xem phim
│   └── Admin/           # Trang admin
│       ├── Dashboard.tsx
│       └── index.ts
└── router.tsx           # Router config với 2 layout
```

## ✨ Tính năng

### UserLayout:

✅ Responsive header
✅ Navigation menu
✅ Authentication modal
✅ Hero banner với nút cùng kích thước
✅ Movie cards và episode cards

### AdminLayout:

✅ Sidebar navigation với active state
✅ Responsive cho mobile/tablet
✅ Dashboard với stats
✅ Dark theme (black + zinc)
✅ Hover effects và animations

## 🔧 Customization

### Thêm menu item mới cho Admin:

```tsx
// src/layouts/AdminLayout.tsx
const menuItems = [
  // ... existing items
  { icon: NewIcon, label: "New Page", path: "/admin/new-page" },
];
```

### Thêm route admin mới:

```tsx
// src/router.tsx
{
  path: 'new-page',
  element: (
    <Suspense fallback={<PageLoader />}>
      <NewPage />
    </Suspense>
  ),
}
```
