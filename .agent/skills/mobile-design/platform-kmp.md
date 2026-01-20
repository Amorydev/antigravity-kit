---
name: platform-kmp
description: Kotlin Multiplatform (KMP) architecture, shared logic patterns, expect/actual mechanism, iOS framework integration, and Compose Multiplatform UI.
---

# Kotlin Multiplatform (KMP) Guide

> **Philosophy:** Share business logic, not UI (unless using Compose Multiplatform).
> **Core Principle:** Write once in Kotlin, compile to native iOS/Android.

---

## 🎯 When to Use KMP

### ✅ GOOD Use Cases:
- **Business Logic Sharing**: Networking, data models, repositories, use cases
- **Type-Safe APIs**: Generate shared API clients from OpenAPI/GraphQL
- **Database Logic**: SQLDelight for shared database code
- **Validation Logic**: Form validation, business rules
- **Utilities**: Date formatting, crypto, parsing
- **Analytics/Logging**: Shared tracking logic

### ❌ NOT Recommended For:
- **UI Code** (unless Compose Multiplatform)
- **Platform-Specific Features**: Camera, contacts, biometrics (use expect/actual)
- **Simple Apps**: Overhead not worth it for CRUD apps
- **Teams Without Kotlin Expertise**: Steep learning curve

---

## 🏗️ KMP Architecture Layers
```
┌─────────────────────────────────────────────────────────────┐
│                     PLATFORM LAYER                          │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │   iOS (SwiftUI)      │      │  Android (Compose)   │    │
│  │   - Views            │      │  - Composables       │    │
│  │   - ViewModels       │      │  - ViewModels        │    │
│  │   - Navigation       │      │  - Navigation        │    │
│  └──────────────────────┘      └──────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                  SHARED KOTLIN CODE                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PRESENTATION LAYER                      │   │
│  │  - ViewModels (if sharing)                          │   │
│  │  - State classes                                     │   │
│  │  - UI Events                                         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DOMAIN LAYER                            │   │
│  │  - Use Cases                                         │   │
│  │  - Business Logic                                    │   │
│  │  - Domain Models                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DATA LAYER                              │   │
│  │  - Repositories                                      │   │
│  │  - API Clients (Ktor)                               │   │
│  │  - Database (SQLDelight)                            │   │
│  │  - Data Models / DTOs                               │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          PLATFORM-SPECIFIC (expect/actual)           │   │
│  │  - File I/O                                          │   │
│  │  - Platform APIs                                     │   │
│  │  - Native Features                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Project Structure
```
my-kmp-app/
├── shared/
│   ├── src/
│   │   ├── commonMain/kotlin/
│   │   │   ├── data/
│   │   │   │   ├── api/
│   │   │   │   │   └── ApiClient.kt
│   │   │   │   ├── database/
│   │   │   │   │   └── Database.kt (SQLDelight)
│   │   │   │   └── repository/
│   │   │   │       └── UserRepository.kt
│   │   │   ├── domain/
│   │   │   │   ├── model/
│   │   │   │   │   └── User.kt
│   │   │   │   └── usecase/
│   │   │   │       └── GetUserUseCase.kt
│   │   │   └── Platform.kt (expect declaration)
│   │   │
│   │   ├── androidMain/kotlin/
│   │   │   └── Platform.android.kt (actual implementation)
│   │   │
│   │   └── iosMain/kotlin/
│   │       └── Platform.ios.kt (actual implementation)
│   │
│   └── build.gradle.kts
│
├── androidApp/
│   ├── src/main/
│   │   ├── java/
│   │   │   └── com/myapp/
│   │   │       ├── ui/
│   │   │       │   └── MainActivity.kt
│   │   │       └── viewmodel/
│   │   │           └── UserViewModel.kt
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
│
└── iosApp/
    ├── iosApp/
    │   ├── ContentView.swift
    │   └── UserViewModel.swift
    └── iosApp.xcodeproj
```

---

## 📦 Core Libraries

### Essential KMP Libraries
```kotlin
// shared/build.gradle.kts

kotlin {
    // Ktor for networking
    sourceSets {
        val commonMain by getting {
            dependencies {
                // Networking
                implementation("io.ktor:ktor-client-core:2.3.7")
                implementation("io.ktor:ktor-client-content-negotiation:2.3.7")
                implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.7")
                
                // Serialization
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.2")
                
                // Coroutines
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
                
                // DateTime
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.5.0")
                
                // DI (optional)
                implementation("io.insert-koin:koin-core:3.5.3")
            }
        }
        
        val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-okhttp:2.3.7")
            }
        }
        
        val iosMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.7")
            }
        }
    }
}
```

### SQLDelight Setup
```kotlin
// shared/build.gradle.kts

plugins {
    id("app.cash.sqldelight") version "2.0.1"
}

sqldelight {
    databases {
        create("AppDatabase") {
            packageName.set("com.myapp.database")
        }
    }
}
```

---

## 🎭 expect/actual Mechanism

### Pattern 1: Platform-Specific Implementation
```kotlin
// commonMain/Platform.kt
expect class Platform() {
    val name: String
}

expect fun getPlatform(): Platform

// androidMain/Platform.android.kt
actual class Platform actual constructor() {
    actual val name: String = "Android ${android.os.Build.VERSION.SDK_INT}"
}

actual fun getPlatform(): Platform = Platform()

// iosMain/Platform.ios.kt
import platform.UIKit.UIDevice

actual class Platform actual constructor() {
    actual val name: String = 
        UIDevice.currentDevice.systemName() + " " + 
        UIDevice.currentDevice.systemVersion
}

actual fun getPlatform(): Platform = Platform()
```

### Pattern 2: Platform-Specific API Access
```kotlin
// commonMain/storage/SecureStorage.kt
expect class SecureStorage {
    suspend fun save(key: String, value: String)
    suspend fun get(key: String): String?
    suspend fun delete(key: String)
}

// androidMain/storage/SecureStorage.android.kt
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

actual class SecureStorage(private val context: Context) {
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()
    
    private val prefs = EncryptedSharedPreferences.create(
        context,
        "secure_prefs",
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )
    
    actual suspend fun save(key: String, value: String) {
        prefs.edit().putString(key, value).apply()
    }
    
    actual suspend fun get(key: String): String? {
        return prefs.getString(key, null)
    }
    
    actual suspend fun delete(key: String) {
        prefs.edit().remove(key).apply()
    }
}

// iosMain/storage/SecureStorage.ios.kt
import platform.Security.*
import platform.Foundation.*

actual class SecureStorage {
    actual suspend fun save(key: String, value: String) {
        val query = mapOf<Any?, Any?>(
            kSecClass to kSecClassGenericPassword,
            kSecAttrAccount to key,
            kSecValueData to value.encodeToByteArray().toNSData()
        )
        SecItemDelete(query as CFDictionaryRef)
        SecItemAdd(query as CFDictionaryRef, null)
    }
    
    actual suspend fun get(key: String): String? {
        val query = mapOf<Any?, Any?>(
            kSecClass to kSecClassGenericPassword,
            kSecAttrAccount to key,
            kSecReturnData to kCFBooleanTrue,
            kSecMatchLimit to kSecMatchLimitOne
        )
        
        val result = memScoped {
            val resultPtr = alloc<CFTypeRefVar>()
            val status = SecItemCopyMatching(query as CFDictionaryRef, resultPtr.ptr)
            
            if (status == errSecSuccess) {
                val data = resultPtr.value as NSData
                NSString.create(data, NSUTF8StringEncoding) as String
            } else null
        }
        
        return result
    }
    
    actual suspend fun delete(key: String) {
        val query = mapOf<Any?, Any?>(
            kSecClass to kSecClassGenericPassword,
            kSecAttrAccount to key
        )
        SecItemDelete(query as CFDictionaryRef)
    }
}
```

---

## 🌐 Networking with Ktor
```kotlin
// commonMain/api/ApiClient.kt

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

class ApiClient {
    private val client = HttpClient {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }
    }
    
    suspend fun getUsers(): List<User> {
        return client.get("https://api.example.com/users").body()
    }
    
    suspend fun createUser(user: User): User {
        return client.post("https://api.example.com/users") {
            setBody(user)
        }.body()
    }
}

@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
)
```

---

## 💾 Database with SQLDelight
```sql
-- shared/src/commonMain/sqldelight/com/myapp/User.sq

CREATE TABLE User (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    createdAt INTEGER NOT NULL
);

selectAll:
SELECT * FROM User;

selectById:
SELECT * FROM User WHERE id = ?;

insert:
INSERT OR REPLACE INTO User(id, name, email, createdAt)
VALUES (?, ?, ?, ?);

deleteById:
DELETE FROM User WHERE id = ?;
```
```kotlin
// commonMain/database/UserDatabase.kt

class UserDatabase(driver: SqlDriver) {
    private val database = AppDatabase(driver)
    private val queries = database.userQueries
    
    fun getAllUsers(): List<User> {
        return queries.selectAll().executeAsList().map { it.toDomain() }
    }
    
    fun getUserById(id: String): User? {
        return queries.selectById(id).executeAsOneOrNull()?.toDomain()
    }
    
    fun insertUser(user: User) {
        queries.insert(
            id = user.id,
            name = user.name,
            email = user.email,
            createdAt = Clock.System.now().toEpochMilliseconds()
        )
    }
    
    fun deleteUser(id: String) {
        queries.deleteById(id)
    }
}

// Mapper
private fun com.myapp.User.toDomain(): User {
    return User(
        id = this.id,
        name = this.name,
        email = this.email
    )
}
```

### Platform-Specific Drivers
```kotlin
// androidMain/database/DriverFactory.android.kt
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.android.AndroidSqliteDriver
import com.myapp.database.AppDatabase

actual class DriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(
            AppDatabase.Schema,
            context,
            "app.db"
        )
    }
}

// iosMain/database/DriverFactory.ios.kt
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver
import com.myapp.database.AppDatabase

actual class DriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(
            AppDatabase.Schema,
            "app.db"
        )
    }
}
```

---

## 🎨 Compose Multiplatform (Optional UI Sharing)

### Setup
```kotlin
// shared/build.gradle.kts

kotlin {
    androidTarget()
    
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach {
        it.binaries.framework {
            baseName = "shared"
            isStatic = true
        }
    }
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(compose.runtime)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.ui)
                implementation(compose.components.resources)
                implementation(compose.components.uiToolingPreview)
            }
        }
    }
}

compose.experimental {
    web.application {}
}
```

### Shared UI Example
```kotlin
// commonMain/ui/UserListScreen.kt

@Composable
fun UserListScreen(
    viewModel: UserViewModel
) {
    val users by viewModel.users.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    
    if (isLoading) {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            CircularProgressIndicator()
        }
    } else {
        LazyColumn {
            items(users) { user ->
                UserItem(user = user)
            }
        }
    }
}

@Composable
fun UserItem(user: User) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(Modifier.padding(16.dp)) {
            Text(
                text = user.name,
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = user.email,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
```

---

## 🍎 iOS Integration

### Creating Framework for iOS
```kotlin
// shared/build.gradle.kts

kotlin {
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "shared"
            isStatic = true // or false for dynamic
            
            // Export dependencies for iOS
            export("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
        }
    }
}
```

### Swift Integration
```swift
// iosApp/UserViewModel.swift

import shared
import Combine

@MainActor
class UserViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var error: String?
    
    private let repository = UserRepository()
    
    func loadUsers() {
        isLoading = true
        
        repository.getUsers { result, error in
            DispatchQueue.main.async {
                self.isLoading = false
                
                if let users = result {
                    self.users = users
                } else if let error = error {
                    self.error = error.localizedDescription
                }
            }
        }
    }
}
```

### Handling Kotlin Coroutines in Swift
```kotlin
// shared/src/iosMain/kotlin/util/CoroutineHelper.kt

// Wrapper for iOS to convert suspend functions to callbacks
class IOSCoroutineHelper {
    fun <T> execute(
        block: suspend () -> T,
        onSuccess: (T) -> Unit,
        onError: (Throwable) -> Unit
    ) {
        MainScope().launch {
            try {
                val result = block()
                onSuccess(result)
            } catch (e: Throwable) {
                onError(e)
            }
        }
    }
}
```
```swift
// Usage in Swift
let helper = IOSCoroutineHelper()

helper.execute(
    block: { try await repository.getUsers() },
    onSuccess: { users in
        self.users = users
    },
    onError: { error in
        self.error = error.localizedDescription
    }
)
```

---

## 🔄 State Management in KMP

### ViewModel Sharing (Optional)
```kotlin
// commonMain/viewmodel/UserViewModel.kt

class UserViewModel(
    private val getUsersUseCase: GetUsersUseCase
) {
    private val _state = MutableStateFlow<UiState>(UiState.Loading)
    val state: StateFlow<UiState> = _state.asStateFlow()
    
    fun loadUsers() {
        viewModelScope.launch {
            _state.value = UiState.Loading
            try {
                val users = getUsersUseCase()
                _state.value = UiState.Success(users)
            } catch (e: Exception) {
                _state.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }
    
    sealed class UiState {
        object Loading : UiState()
        data class Success(val users: List<User>) : UiState()
        data class Error(val message: String) : UiState()
    }
}
```

---

## ⚡ Performance Considerations

### iOS Framework Size
```bash
# Check framework size
du -sh iosApp/Pods/shared/shared.framework

# Optimize:
# 1. Use static framework (smaller)
# 2. Enable code stripping
# 3. Use ProGuard/R8 for Android
```

### Memory Management
```kotlin
// iOS: Be careful with cycles
class MyClass {
    private var callback: (() -> Unit)? = null
    
    fun setCallback(cb: @escaping () -> Void) {
        // Weak reference to avoid retain cycles
        callback = { [weak self] in
            cb()
        }
    }
}
```

---

## 🚫 KMP Anti-Patterns

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Share UI code (without Compose MP) | Share logic only | Platform UI feels native |
| Use Android APIs in commonMain | Use expect/actual | Won't compile for iOS |
| Block main thread | Use coroutines | Freezing on iOS |
| Ignore iOS memory model | Understand freezing/thawing | Crashes on iOS |
| Skip platform testing | Test on both platforms | Subtle bugs per platform |
| Use mutable shared state carelessly | Immutable data or StateFlow | Thread safety issues |

---

## 📋 KMP Checklist

### Before Starting KMP Project

- [ ] **Team has Kotlin expertise?**
- [ ] **Business logic complex enough to justify KMP?**
- [ ] **Both iOS and Android targets needed?**
- [ ] **UI will be platform-specific or Compose MP?**
- [ ] **CI/CD supports iOS + Android builds?**

### Project Setup

- [ ] **Gradle configured for multiplatform?**
- [ ] **expect/actual declarations planned?**
- [ ] **SQLDelight or other DB set up?**
- [ ] **Ktor configured with platform engines?**
- [ ] **iOS framework exported correctly?**
- [ ] **CocoaPods or SPM integration working?**

### Development

- [ ] **Shared code in commonMain only?**
- [ ] **Platform-specific code in androidMain/iosMain?**
- [ ] **Coroutines used correctly (MainScope for iOS)?**
- [ ] **Serialization working on both platforms?**
- [ ] **Database migrations planned?**

### iOS Integration

- [ ] **Framework builds successfully?**
- [ ] **Swift can import and use shared code?**
- [ ] **Memory leaks checked (Xcode Instruments)?**
- [ ] **Callback-based APIs for iOS (if needed)?**
- [ ] **iOS-specific permissions handled?**

---

## 🎯 Decision: KMP vs React Native vs Flutter
```
USE KMP IF:
├── Existing native iOS/Android apps
├── Team has strong Kotlin expertise
├── Need native UI feel on both platforms
├── Complex business logic to share
└── Performance critical (games, heavy computation)

USE REACT NATIVE IF:
├── Team has JavaScript/React expertise
├── Need OTA updates
├── Rapid iteration important
└── Large ecosystem of libraries needed

USE FLUTTER IF:
├── Need pixel-perfect custom UI
├── Team comfortable with Dart
├── Strong animation requirements
└── Greenfield project
```

---

## 📚 Resources

- [Official KMP Docs](https://kotlinlang.org/docs/multiplatform.html)
- [KMP Samples](https://github.com/Kotlin/kmm-samples)
- [Ktor Documentation](https://ktor.io/)
- [SQLDelight](https://cashapp.github.io/sqldelight/)
- [Compose Multiplatform](https://www.jetbrains.com/lp/compose-multiplatform/)

---

> **Remember:** KMP is about sharing logic, not UI (unless you choose Compose Multiplatform). Keep platform UI native for best user experience.