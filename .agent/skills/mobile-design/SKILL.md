---
name: mobile-design
description: Mobile-first design thinking and decision-making for iOS and Android apps. Touch interaction, performance patterns, platform conventions. Teaches principles, not fixed values. Use when building React Native, Flutter, or native mobile apps.
allowed-tools: Read, Glob, Grep, Bash
---

# Mobile Design System

> **Philosophy:** Touch-first. Battery-conscious. Platform-respectful. Offline-capable.
> **Core Principle:** Mobile is NOT a small desktop. THINK mobile constraints, ASK platform choice.

---

## 🔧 Runtime Scripts

**Execute these for validation (don't read, just run):**

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/mobile_audit.py` | Mobile UX & Touch Audit | `python scripts/mobile_audit.py <project_path>` |

---

## 🔴 MANDATORY: Read Reference Files Before Working!

**⛔ DO NOT start development until you read the relevant files:**

### Universal (Always Read)

| File | Content | Status |
|------|---------|--------|
| **[mobile-design-thinking.md](mobile-design-thinking.md)** | **⚠️ ANTI-MEMORIZATION: Forces thinking, prevents AI defaults** | **⬜ CRITICAL FIRST** |
| **[touch-psychology.md](touch-psychology.md)** | **Fitts' Law, gestures, haptics, thumb zone** | **⬜ CRITICAL** |
| **[mobile-performance.md](mobile-performance.md)** | **RN/Flutter performance, 60fps, memory** | **⬜ CRITICAL** |
| **[mobile-backend.md](mobile-backend.md)** | **Push notifications, offline sync, mobile API** | **⬜ CRITICAL** |
| **[mobile-testing.md](mobile-testing.md)** | **Testing pyramid, E2E, platform-specific** | **⬜ CRITICAL** |
| **[mobile-debugging.md](mobile-debugging.md)** | **Native vs JS debugging, Flipper, Logcat** | **⬜ CRITICAL** |
| [mobile-navigation.md](mobile-navigation.md) | Tab/Stack/Drawer, deep linking | ⬜ Read |
| [mobile-typography.md](mobile-typography.md) | System fonts, Dynamic Type, a11y | ⬜ Read |
| [mobile-color-system.md](mobile-color-system.md) | OLED, dark mode, battery-aware | ⬜ Read |
| [decision-trees.md](decision-trees.md) | Framework/state/storage selection | ⬜ Read |

> 🧠 **mobile-design-thinking.md is PRIORITY!** This file ensures AI thinks instead of using memorized patterns.

### Platform-Specific (Read Based on Target)

| Platform | File | Content | When to Read |
|----------|------|---------|--------------|
| **iOS** | [platform-ios.md](../skills/mobile-design/platform-ios.md) | Building for iPhone/iPad |
| **Android** | [platform-android.md](../skills/mobile-design/platform-android.md) | Building for Android |
| **Kotlin Multiplatform** | [platform-kmp.md](../skills/mobile-design/platform-kmp.md) | **Shared logic, expect/actual, iOS integration, Compose Multiplatform** | **Building with KMP** |
| **Cross-Platform** | All relevant above | Platform divergence points | React Native / Flutter / KMP |

> 🔴 **If building with KMP → Read platform-kmp.md FIRST!**
> 🔴 **KMP + iOS UI → Read platform-kmp.md + platform-ios.md**
> 🔴 **KMP + Android UI → Read platform-kmp.md + platform-android.md**
> 🔴 **Compose Multiplatform → Read platform-kmp.md + both platform files**

---

## ⚠️ CRITICAL: ASK BEFORE ASSUMING (MANDATORY)

> **STOP! If the user's request is open-ended, DO NOT default to your favorites.**
> **ALWAYS ask these questions FIRST before generating any code.**

### Core Decisions (MUST Ask If Not Specified)

| Aspect | Question | Why | Follow-up Considerations |
|--------|----------|-----|-------------------------|
| **Platform** | "iOS, Android, or both?" | Affects EVERY design decision | - iOS minimum version (14+, 15+)? <br>- Android API level (21+, 24+)? <br>- Platform-specific features needed? |
| **Framework** | "React Native, Flutter, Kotlin Multiplatform, or native?" | Determines patterns and tools | - Team expertise? <br>- Performance requirements? <br>- Code sharing vs platform optimization? |
| **Navigation** | "Tab bar, drawer, or stack-based?" | Core UX decision | - Deep linking needed? <br>- Nested navigation? <br>- Modal flows? |
| **State** | "What state management?" <br>(Zustand/Redux/Riverpod/BLoC/MobX) | Architecture foundation | - Global vs local state split? <br>- Persistence needed? <br>- DevTools requirements? |
| **Offline** | "Does this need to work offline?" | Affects data strategy | - Full offline mode or just caching? <br>- Conflict resolution strategy? <br>- Background sync? |
| **Target devices** | "Phone only, or tablet support?" | Layout complexity | - Foldables? <br>- Landscape orientation? <br>- Responsive breakpoints? |

### Additional Critical Questions (Ask When Relevant)

| Aspect | Question | Why | Impact |
|--------|----------|-----|--------|
| **Authentication** | "What auth method?" <br>(OAuth, biometrics, SSO) | Security & UX baseline | Affects onboarding, session management, keychain usage |
| **API Integration** | "REST, GraphQL, or gRPC?" | Data layer architecture | Determines networking library, caching strategy, type generation |
| **Analytics** | "What tracking is needed?" | User insights & debugging | Firebase, Mixpanel, custom? GDPR compliance? |
| **Push Notifications** | "Local, remote, or both?" | Engagement strategy | FCM/APNs setup, notification permissions flow |
| **Payments** | "In-app purchases or external?" | Revenue model | App Store/Play Store policies, payment provider integration |
| **Media** | "Camera, photos, video?" | Native permissions needed | Storage strategy, compression, upload handling |
| **Location** | "Background tracking or on-demand?" | Battery & privacy impact | Permission strategy (always/when-in-use), geofencing |
| **Theme** | "Light/dark mode support?" | Modern UX expectation | Color system, system preference detection |
| **Internationalization** | "Multi-language support?" | Global reach | RTL support, locale management, date/number formatting |
| **Testing** | "Unit, integration, E2E?" | Quality assurance | Detox/Appium for E2E, testing strategy, CI/CD pipeline |

### Framework-Specific Questions

#### React Native
- "Expo or bare workflow?"
- "New Architecture (Fabric/TurboModules)?"
- "Monorepo setup?"
- "TypeScript or JavaScript?"

#### Flutter
- "Material or Cupertino design?"
- "Code generation (freezed/json_serializable)?"
- "Platform channels needed?"
- "State: BLoC, Provider, Riverpod, or GetX?"

#### Kotlin Multiplatform
- "iOS framework type (static/dynamic)?"
- "Shared UI or logic only?"
- "Compose Multiplatform for UI?"
- "Ktor or other networking?"

#### Native (Jetpack Compose)
- "Single Activity or multi-Activity?"
- "ViewModel scoping strategy?"
- "Modularization approach?"
- "Hilt or Koin for DI?"

### ⛔ DEFAULT TENDENCIES TO AVOID:

| AI Default Tendency | Why It's Bad | Think Instead |
|---------------------|--------------|---------------|
| **ScrollView for lists** | Memory explosion | Is this a list? → FlatList |
| **Inline renderItem** | Re-renders all items | Am I memoizing renderItem? |
| **AsyncStorage for tokens** | Insecure | Is this sensitive? → SecureStore |
| **Same stack for all projects** | Doesn't fit context | What does THIS project need? |
| **Skipping platform checks** | Feels broken to users | iOS = iOS feel, Android = Android feel |
| **Redux for simple apps** | Overkill | Is Zustand enough? |
| **Ignoring thumb zone** | Hard to use one-handed | Where is the primary CTA? |

---

## 🚫 MOBILE ANTI-PATTERNS (NEVER DO THESE!)

> **If you catch yourself doing ANY of these, STOP and refactor immediately.**

### Performance Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| `ScrollView` for lists | `FlatList` / `FlashList` / `ListView.builder` | ScrollView renders ALL items at once (OOM crash) |
| Inline `renderItem` function | `useCallback` + `React.memo` | Causes re-render of entire list on state change |
| Missing `keyExtractor` | Stable unique ID from data | Without it, React can't optimize rerenders |
| `useNativeDriver: false` | `useNativeDriver: true` (when possible) | JS thread animations drop frames at 60fps |
| `console.log` in production | Remove before release | Massive performance impact on devices |
| Heavy computation in render | `useMemo` / `useEffect` / background thread | Blocks UI thread → janky scrolling |
| `setState()` for everything (Flutter) | Targeted state, `const` constructors | Rebuilds entire widget tree unnecessarily |
| Deep widget trees | Extract widgets, use `const` | Flutter: Every level adds layout cost |
| Large images without sizing | `resizeMode`, compression, CDN | Loads full resolution → memory spike |
| Unoptimized re-renders | `React.memo`, `shouldComponentUpdate`, `key` | Wasted CPU cycles on unchanged components |

### Touch/UX Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Touch target < 44px | Minimum 44pt (iOS) / 48dp (Android) | Accessibility + fat-finger errors |
| Spacing < 8px | Minimum 8-12px gap | Cramped UI, accidental taps |
| Gesture-only navigation | Provide visible button alternative | Discoverability + accessibility |
| No loading state | ALWAYS show skeleton/spinner | Users think app froze |
| No error state | Show error with retry option | Dead ends frustrate users |
| No offline handling | Graceful degradation, cached data | Apps crash when network drops |
| Platform-inconsistent UI | Follow HIG (iOS) / Material (Android) | Users notice "wrong" patterns instantly |
| Blocking main thread | Async operations, background threads | App freezes → ANR (Android) / watchdog (iOS) |
| No empty states | Show helpful message + action | Blank screens confuse users |
| Missing ripple/haptic feedback | Provide tactile response | Feels unresponsive without it |

### Security Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Token in `AsyncStorage` | `SecureStore` (Expo) / `Keychain` (iOS) / `EncryptedSharedPreferences` (Android) | AsyncStorage is plaintext, easily extractable |
| Hardcode API keys | Environment variables (`.env`) | Keys leak in version control |
| Skip SSL pinning | Pin certificates in production | Prevents MITM attacks |
| Log sensitive data | Never log tokens, passwords, PII | Logs persist on device, visible in crash reports |
| Trust user input | Validate + sanitize everything | SQL injection, XSS in WebViews |
| Store passwords | Use OAuth / biometrics | Password managers exist for a reason |
| HTTP in production | HTTPS only + ATS (iOS) / cleartext off (Android) | Network traffic visible on public WiFi |
| Ignore permissions | Request at point of use, explain why | Users deny "creepy" permission requests |

### Navigation Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Nested navigators without planning | Flat structure when possible | Navigation state becomes unpredictable |
| `navigate()` without checking state | Use `navigation.canGoBack()` | App crashes on back press |
| Passing large objects in params | Pass IDs, fetch in destination | Route params serialized → perf hit |
| No deep linking setup | Configure universal links + URL schemes | Can't link to specific screens |
| Ignoring back button (Android) | Handle `BackHandler` | Breaks user expectations |
| Tab bar + drawer together | Pick one primary navigation | Confusing UX, conflicts |

### State Management Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Global state for everything | Local state by default, lift when needed | Unnecessary re-renders across app |
| Prop drilling 5+ levels | Context / state management library | Unmaintainable, fragile |
| Mutating state directly | Immutable updates (`...spread`, `produce`) | React/Flutter can't detect changes |
| No state persistence | Save critical state (auth, cart) | User loses progress on app kill |
| Using Context for high-frequency updates | Zustand / Redux / Riverpod | Context re-renders all consumers |
| Forgetting to cleanup | `useEffect` return, `dispose()` | Memory leaks, subscriptions pile up |

### API/Data Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| No request timeout | Set timeout (10-30s) | Hangs forever on poor connection |
| No retry logic | Exponential backoff + max retries | Temporary failures shouldn't kill UX |
| Fetch on every render | Cache, debounce, or React Query | Hammers API, wastes data |
| No pagination | Lazy load, infinite scroll | Loading 10k items crashes app |
| Ignoring HTTP status codes | Handle 401, 403, 429, 500+ | Silent failures confuse users |
| Trusting API response shape | Validate with Zod / type guards | Runtime errors from API changes |
| No offline-first strategy | Cache data, sync when online | Apps feel broken without internet |

### Build/Deployment Sins

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Commit secrets | `.gitignore` sensitive files | Leaked on GitHub → security breach |
| Skip version bumping | Increment `versionCode` / `CFBundleVersion` | Can't deploy without it |
| No crash reporting | Sentry, Crashlytics, Bugsnag | You won't know why users crash |
| No analytics | Firebase, Mixpanel, Amplitude | Flying blind on user behavior |
| Test only on emulator | Test on real devices | Emulators hide performance issues |
| Ignore store guidelines | Read App Store / Play Store policies | Rejection delays launch by weeks |
| No staged rollout | Gradual rollout (10% → 50% → 100%) | Catch critical bugs before full release |

### React Native Specific

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Old React Navigation version | Stay on latest stable | Breaking changes pile up |
| Ignoring new architecture | Plan migration to Fabric/TurboModules | Old arch deprecated soon |
| Massive bundle size | Code splitting, lazy loading | Slow startup, app store limits |
| `react-native-vector-icons` without linking | Use Expo vector-icons or link properly | Icons don't show |

### Flutter Specific

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| `setState()` in StatelessWidget | Use StatefulWidget or state management | Runtime error |
| Not using `const` constructors | Mark immutable widgets `const` | Rebuild optimizations |
| Rebuilding entire screen | `Consumer` / `Selector` for targeted updates | Wastes CPU |
| Ignoring widget lifecycle | `initState`, `dispose` correctly | Memory leaks, stale state |

### Jetpack Compose Specific

| ❌ NEVER | ✅ ALWAYS | Why |
|----------|----------|-----|
| Side effects in composition | Use `LaunchedEffect`, `DisposableEffect` | Unpredictable behavior |
| Mutable state without `remember` | `remember { mutableStateOf() }` | State lost on recomposition |
| Heavy work in `@Composable` | Move to ViewModel / coroutine | Janky UI |
| Not using `derivedStateOf` | Derive computed values properly | Unnecessary recompositions |

---

## 📱 Platform Decision Matrix

### When to Unify vs Diverge

```
                    UNIFY (same on both)          DIVERGE (platform-specific)
                    ───────────────────           ──────────────────────────
Business Logic      ✅ Always                     -
Data Layer          ✅ Always                     -
Core Features       ✅ Always                     -
                    
Navigation          -                             ✅ iOS: edge swipe, Android: back button
Gestures            -                             ✅ Platform-native feel
Icons               -                             ✅ SF Symbols vs Material Icons
Date Pickers        -                             ✅ Native pickers feel right
Modals/Sheets       -                             ✅ iOS: bottom sheet vs Android: dialog
Typography          -                             ✅ SF Pro vs Roboto (or custom)
Error Dialogs       -                             ✅ Platform conventions for alerts
```

### Quick Reference: Platform Defaults

| Element | iOS | Android |
|---------|-----|---------|
| **Primary Font** | SF Pro / SF Compact | Roboto |
| **Min Touch Target** | 44pt × 44pt | 48dp × 48dp |
| **Back Navigation** | Edge swipe left | System back button/gesture |
| **Bottom Tab Icons** | SF Symbols | Material Symbols |
| **Action Sheet** | UIActionSheet from bottom | Bottom Sheet / Dialog |
| **Progress** | Spinner | Linear progress (Material) |
| **Pull to Refresh** | Native UIRefreshControl | SwipeRefreshLayout |

---

## 🧠 Mobile UX Psychology (Quick Reference)

### Fitts' Law for Touch

```
Desktop: Cursor is precise (1px)
Mobile:  Finger is imprecise (~7mm contact area)

→ Touch targets MUST be 44-48px minimum
→ Important actions in THUMB ZONE (bottom of screen)
→ Destructive actions AWAY from easy reach
```

### Thumb Zone (One-Handed Usage)

```
┌─────────────────────────────┐
│      HARD TO REACH          │ ← Navigation, menu, back
│        (stretch)            │
├─────────────────────────────┤
│      OK TO REACH            │ ← Secondary actions
│       (natural)             │
├─────────────────────────────┤
│      EASY TO REACH          │ ← PRIMARY CTAs, tab bar
│    (thumb's natural arc)    │ ← Main content interaction
└─────────────────────────────┘
        [  HOME  ]
```

### Mobile-Specific Cognitive Load

| Desktop | Mobile Difference |
|---------|-------------------|
| Multiple windows | ONE task at a time |
| Keyboard shortcuts | Touch gestures |
| Hover states | NO hover (tap or nothing) |
| Large viewport | Limited space, scroll vertical |
| Stable attention | Interrupted constantly |

For deep dive: [touch-psychology.md](touch-psychology.md)

---

## ⚡ Performance Principles (Quick Reference)

### React Native Critical Rules
```typescript
// ✅ CORRECT: Memoized renderItem + React.memo wrapper
const ListItem = React.memo(({ item }: { item: Item }) => (
  <View style={styles.item}>
    <Text>{item.title}</Text>
  </View>
));

const renderItem = useCallback(
  ({ item }: { item: Item }) => <ListItem item={item} />,
  []
);

// ✅ CORRECT: FlatList with all optimizations
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}  // Stable ID, NOT index
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Flutter Critical Rules
```dart
// ✅ CORRECT: const constructors prevent rebuilds
class MyWidget extends StatelessWidget {
  const MyWidget({super.key}); // CONST!

  @override
  Widget build(BuildContext context) {
    return const Column( // CONST!
      children: [
        Text('Static content'),
        MyConstantWidget(),
      ],
    );
  }
}

// ✅ CORRECT: Targeted state with ValueListenableBuilder
ValueListenableBuilder<int>(
  valueListenable: counter,
  builder: (context, value, child) => Text('$value'),
  child: const ExpensiveWidget(), // Won't rebuild!
)
```

### Kotlin Multiplatform Critical Rules
```kotlin
// ✅ CORRECT: Immutable data classes for thread safety
@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
) // Immutable by default!

// ✅ CORRECT: StateFlow for reactive state (thread-safe)
class UserRepository {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow() // Read-only
    
    suspend fun loadUsers() {
        val result = apiClient.getUsers()
        _users.value = result // Thread-safe update
    }
}

// ✅ CORRECT: Coroutines with proper scope
class UserViewModel {
    private val scope = MainScope() // For iOS compatibility
    
    fun loadData() {
        scope.launch {
            try {
                repository.loadUsers()
            } catch (e: Exception) {
                handleError(e)
            }
        }
    }
    
    fun onCleared() {
        scope.cancel() // ALWAYS cleanup!
    }
}

// ✅ CORRECT: Platform-specific optimization with expect/actual
// commonMain
expect fun <T> runOnBackground(block: suspend () -> T): T

// androidMain
actual fun <T> runOnBackground(block: suspend () -> T): T {
    return runBlocking(Dispatchers.IO) { block() }
}

// iosMain
actual fun <T> runOnBackground(block: suspend () -> T): T {
    return runBlocking(Dispatchers.Default) { block() }
}
```

### Jetpack Compose Critical Rules
```kotlin
// ✅ CORRECT: Stable keys for LazyColumn
LazyColumn {
    items(
        items = userList,
        key = { user -> user.id } // Stable key for animations
    ) { user ->
        UserRow(user = user)
    }
}

// ✅ CORRECT: remember for expensive computations
@Composable
fun ExpensiveComponent(data: List<Int>) {
    val processedData = remember(data) {
        data.map { /* expensive operation */ }
    } // Only recomputes when 'data' changes
    
    // Use processedData...
}

// ✅ CORRECT: derivedStateOf for computed values
@Composable
fun FilteredList(items: List<Item>, query: String) {
    val filteredItems by remember {
        derivedStateOf {
            items.filter { it.name.contains(query, ignoreCase = true) }
        }
    } // Only recomputes when items or query changes
    
    LazyColumn {
        items(filteredItems) { item ->
            ItemRow(item)
        }
    }
}

// ✅ CORRECT: Avoid side effects in composition
@Composable
fun UserProfile(userId: String, viewModel: UserViewModel) {
    // ❌ WRONG: Side effect in composition
    // viewModel.loadUser(userId)
    
    // ✅ CORRECT: Use LaunchedEffect
    LaunchedEffect(userId) {
        viewModel.loadUser(userId)
    }
    
    val user by viewModel.user.collectAsState()
    // Render user...
}

// ✅ CORRECT: Cleanup with DisposableEffect
@Composable
fun LocationTracker() {
    DisposableEffect(Unit) {
        val listener = LocationListener()
        locationManager.addListener(listener)
        
        onDispose {
            locationManager.removeListener(listener) // CLEANUP!
        }
    }
}
```

### Compose Multiplatform Critical Rules
```kotlin
// ✅ CORRECT: Platform-specific optimizations
@Composable
expect fun PlatformOptimizedList(
    items: List<Item>,
    onItemClick: (Item) -> Unit
)

// androidMain - Use LazyColumn
@Composable
actual fun PlatformOptimizedList(
    items: List<Item>,
    onItemClick: (Item) -> Unit
) {
    LazyColumn {
        items(items, key = { it.id }) { item ->
            ItemRow(item, onItemClick)
        }
    }
}

// iosMain - Use LazyColumn (same in Compose MP)
@Composable
actual fun PlatformOptimizedList(
    items: List<Item>,
    onItemClick: (Item) -> Unit
) {
    LazyColumn {
        items(items, key = { it.id }) { item ->
            ItemRow(item, onItemClick)
        }
    }
}

// ✅ CORRECT: Shared ViewModel with proper lifecycle
class SharedViewModel {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _state = MutableStateFlow(UiState.Loading)
    val state = _state.asStateFlow()
    
    fun onCleared() {
        scope.cancel() // Called from platform-specific cleanup
    }
}

// Android integration
class MyActivity : ComponentActivity() {
    private val viewModel = SharedViewModel()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val state by viewModel.state.collectAsState()
            MyScreen(state)
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        viewModel.onCleared()
    }
}

// iOS integration (Swift)
class MyViewController: UIViewController {
    private let viewModel = SharedViewModel()
    
    deinit {
        viewModel.onCleared()
    }
}
```

---

### Performance Comparison

| Framework | Key Optimization | Why |
|-----------|-----------------|-----|
| **React Native** | `React.memo` + `useCallback` | Prevent unnecessary re-renders of list items |
| **Flutter** | `const` constructors | Skip rebuild during parent widget updates |
| **Jetpack Compose** | `remember` + `derivedStateOf` | Cache expensive computations |
| **KMP (Shared Logic)** | Immutable data + `StateFlow` | Thread-safe reactive state |
| **Compose Multiplatform** | Same as Jetpack Compose | Consistent optimization across platforms |

---

### Animation Performance
```
GPU-accelerated (FAST):     CPU-bound (SLOW):
├── transform               ├── width, height
├── opacity                 ├── top, left, right, bottom
└── (use these ONLY)        ├── margin, padding
                            └── (AVOID animating these)

React Native:
useNativeDriver: true // ✅ GPU
useNativeDriver: false // ❌ JS thread

Flutter:
Transform.translate() // ✅ GPU
Container(width: animated) // ❌ CPU

Compose:
Modifier.graphicsLayer { // ✅ GPU
    translationX = animatedValue
}
Modifier.offset { // ❌ Recomposition
    IntOffset(animatedValue.toInt(), 0)
}
```

---

### Memory Management
```kotlin
// ✅ KMP: Proper coroutine cleanup
class Repository {
    private val scope = CoroutineScope(SupervisorJob())
    
    fun fetchData() {
        scope.launch {
            // Async work
        }
    }
    
    fun dispose() {
        scope.cancel() // CRITICAL: Cancel all coroutines
    }
}

// ✅ React Native: Cleanup subscriptions
useEffect(() => {
    const subscription = api.subscribe(data => {
        setState(data);
    });
    
    return () => subscription.unsubscribe(); // CLEANUP!
}, []);

// ✅ Flutter: Dispose controllers
class _MyWidgetState extends State<MyWidget> {
    late final AnimationController _controller;
    
    @override
    void initState() {
        super.initState();
        _controller = AnimationController(vsync: this);
    }
    
    @override
    void dispose() {
        _controller.dispose(); // CLEANUP!
        super.dispose();
    }
}

// ✅ Compose: DisposableEffect
@Composable
fun MyComponent() {
    DisposableEffect(Unit) {
        val resource = createResource()
        onDispose {
            resource.release() // CLEANUP!
        }
    }
}
```

---

### Database Performance (KMP with SQLDelight)
```kotlin
// ✅ CORRECT: Batch operations
fun insertUsers(users: List<User>) {
    database.transaction {
        users.forEach { user ->
            queries.insertUser(user.id, user.name, user.email)
        }
    } // Single transaction = much faster
}

// ✅ CORRECT: Indexed queries
// In .sq file
CREATE TABLE User (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    createdAt INTEGER NOT NULL
);

CREATE INDEX user_email ON User(email); // Index for fast lookup

// ❌ WRONG: Query in loop
fun getUsers(): List<UserWithPosts> {
    val users = queries.selectAllUsers().executeAsList()
    return users.map { user ->
        val posts = queries.selectPostsByUserId(user.id).executeAsList()
        UserWithPosts(user, posts) // N+1 query problem!
    }
}

// ✅ CORRECT: Join query
// In .sq file
selectUsersWithPosts:
SELECT User.*, Post.*
FROM User
LEFT JOIN Post ON User.id = Post.userId;
```

---

### Network Performance (KMP with Ktor)
```kotlin
// ✅ CORRECT: Connection pooling + timeout
val client = HttpClient {
    engine {
        // Android (OkHttp)
        threadsCount = 4
        pipelining = true
    }
    
    install(HttpTimeout) {
        requestTimeoutMillis = 10_000
        connectTimeoutMillis = 5_000
    }
    
    install(ContentNegotiation) {
        json(Json {
            ignoreUnknownKeys = true // Don't parse unused fields
        })
    }
}

// ✅ CORRECT: Batch API calls
suspend fun loadDashboard(): Dashboard {
    // Parallel requests
    val (user, posts, notifications) = coroutineScope {
        val userDeferred = async { api.getUser() }
        val postsDeferred = async { api.getPosts() }
        val notificationsDeferred = async { api.getNotifications() }
        
        Triple(
            userDeferred.await(),
            postsDeferred.await(),
            notificationsDeferred.await()
        )
    }
    
    return Dashboard(user, posts, notifications)
}

// ❌ WRONG: Sequential requests
suspend fun loadDashboardSlow(): Dashboard {
    val user = api.getUser() // Wait...
    val posts = api.getPosts() // Wait...
    val notifications = api.getNotifications() // Wait...
    return Dashboard(user, posts, notifications)
}
```

---

### iOS-Specific KMP Performance
```kotlin
// ✅ CORRECT: Use MainScope for iOS compatibility
class iOSViewModel {
    private val scope = MainScope() // Works on iOS main thread
    
    fun loadData() {
        scope.launch {
            val data = repository.fetchData()
            updateUI(data)
        }
    }
}

// ✅ CORRECT: Freeze immutable data for iOS (pre-new memory model)
data class User(val id: String, val name: String) {
    init {
        freeze() // For Kotlin/Native < 1.6
    }
}

// ✅ CORRECT: Use new memory model (Kotlin 1.6+)
// In gradle.properties:
kotlin.native.binary.memoryModel=experimental

// No more freezing needed! 🎉
```
---
### Animation Performance

```
GPU-accelerated (FAST):     CPU-bound (SLOW):
├── transform               ├── width, height
├── opacity                 ├── top, left, right, bottom
└── (use these ONLY)        ├── margin, padding
                            └── (AVOID animating these)
```

For complete guide: [mobile-performance.md](mobile-performance.md)

---

## 📝 CHECKPOINT (MANDATORY Before Any Mobile Work)

> **Before writing ANY mobile code, you MUST complete this checkpoint:**

```
🧠 CHECKPOINT:

Platform:   [ iOS / Android / Both ]
Framework:  [ React Native / Flutter / SwiftUI / Kotlin ]
Files Read: [ List the skill files you've read ]

3 Principles I Will Apply:
1. _______________
2. _______________
3. _______________

Anti-Patterns I Will Avoid:
1. _______________
2. _______________
```

**Example:**
```
🧠 CHECKPOINT:

Platform:   iOS + Android (Cross-platform)
Framework:  React Native + Expo
Files Read: touch-psychology.md, mobile-performance.md, platform-ios.md, platform-android.md

3 Principles I Will Apply:
1. FlatList with React.memo + useCallback for all lists
2. 48px touch targets, thumb zone for primary CTAs
3. Platform-specific navigation (edge swipe iOS, back button Android)

Anti-Patterns I Will Avoid:
1. ScrollView for lists → FlatList
2. Inline renderItem → Memoized
3. AsyncStorage for tokens → SecureStore
```

> 🔴 **Can't fill the checkpoint? → GO BACK AND READ THE SKILL FILES.**

---

## 🔧 Framework Decision Tree

```
WHAT ARE YOU BUILDING?
        │
        ├── Need OTA updates + rapid iteration + web team
        │   └── ✅ React Native + Expo
        │
        ├── Need pixel-perfect custom UI + performance critical
        │   └── ✅ Flutter
        │
        ├── Deep native features + single platform focus
        │   ├── iOS only → SwiftUI
        │   └── Android only → Kotlin + Jetpack Compose
        │
        ├── Existing RN codebase + new features
        │   └── ✅ React Native (bare workflow)
        │
        └── Enterprise + existing Flutter codebase
            └── ✅ Flutter
```

For complete decision trees: [decision-trees.md](decision-trees.md)

---

## 📋 Pre-Development Checklist

### Before Starting ANY Mobile Project

- [ ] **Platform confirmed?** (iOS / Android / Both)
- [ ] **Framework chosen?** (RN / Flutter / Native)
- [ ] **Navigation pattern decided?** (Tabs / Stack / Drawer)
- [ ] **State management selected?** (Zustand / Redux / Riverpod / BLoC)
- [ ] **Offline requirements known?**
- [ ] **Deep linking planned from day one?**
- [ ] **Target devices defined?** (Phone / Tablet / Both)

### Before Every Screen

- [ ] **Touch targets ≥ 44-48px?**
- [ ] **Primary CTA in thumb zone?**
- [ ] **Loading state exists?**
- [ ] **Error state with retry exists?**
- [ ] **Offline handling considered?**
- [ ] **Platform conventions followed?**

### Before Release

- [ ] **console.log removed?**
- [ ] **SecureStore for sensitive data?**
- [ ] **SSL pinning enabled?**
- [ ] **Lists optimized (memo, keyExtractor)?**
- [ ] **Memory cleanup on unmount?**
- [ ] **Tested on low-end devices?**
- [ ] **Accessibility labels on all interactive elements?**

---

## 📚 Reference Files

For deeper guidance on specific areas:

| File | When to Use |
|------|-------------|
| [mobile-design-thinking.md](mobile-design-thinking.md) | **FIRST! Anti-memorization, forces context-based thinking** |
| [touch-psychology.md](touch-psychology.md) | Understanding touch interaction, Fitts' Law, gesture design |
| [mobile-performance.md](mobile-performance.md) | Optimizing RN/Flutter, 60fps, memory/battery |
| [platform-ios.md](platform-ios.md) | iOS-specific design, HIG compliance |
| [platform-android.md](platform-android.md) | Android-specific design, Material Design 3 |
| [mobile-navigation.md](mobile-navigation.md) | Navigation patterns, deep linking |
| [mobile-typography.md](mobile-typography.md) | Type scale, system fonts, accessibility |
| [mobile-color-system.md](mobile-color-system.md) | OLED optimization, dark mode, battery |
| [decision-trees.md](decision-trees.md) | Framework, state, storage decisions |

---

> **Remember:** Mobile users are impatient, interrupted, and using imprecise fingers on small screens. Design for the WORST conditions: bad network, one hand, bright sun, low battery. If it works there, it works everywhere.
