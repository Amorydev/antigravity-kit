# Mobile Performance Reference

> Deep dive into React Native, Flutter, Jetpack Compose and Kotlin Multiplatform performance optimization, 60fps animations, memory management, and battery considerations.
> **This file covers the #1 area where AI-generated code FAILS.**

---

## 1. The Mobile Performance Mindset

### Why Mobile Performance is Different

```
DESKTOP:                          MOBILE:
├── Unlimited power               ├── Battery matters
├── Abundant RAM                  ├── RAM is shared, limited
├── Stable network                ├── Network is unreliable
├── CPU always available          ├── CPU throttles when hot
└── User expects fast anyway      └── User expects INSTANT
```

### Performance Budget Concept

```
Every frame must complete in:
├── 60fps → 16.67ms per frame
├── 120fps (ProMotion) → 8.33ms per frame

If your code takes longer:
├── Frame drops → Janky scroll/animation
├── User perceives as "slow" or "broken"
└── They WILL uninstall your app
```

---

## 2. React Native Performance

### 🚫 The #1 AI Mistake: ScrollView for Lists
```javascript
// ❌ NEVER DO THIS - AI's favorite mistake
<ScrollView>
  {items.map(item => (
    <ItemComponent key={item.id} item={item} />
  ))}
</ScrollView>

// Why it's catastrophic:
// ├── Renders ALL items immediately (1000 items = 1000 renders)
// ├── Memory explodes
// ├── Initial render takes seconds
// └── Scroll becomes janky

// ✅ ALWAYS USE FlatList
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item => item.id}
/>
```

### FlatList Optimization Checklist
```javascript
// ✅ CORRECT: All optimizations applied

// 1. Memoize the item component
const ListItem = React.memo(({ item }: { item: Item }) => {
  return (
    <Pressable style={styles.item}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

// 2. Memoize renderItem with useCallback
const renderItem = useCallback(
  ({ item }: { item: Item }) => <ListItem item={item} />,
  [] // Empty deps = never recreated
);

// 3. Stable keyExtractor (NEVER use index!)
const keyExtractor = useCallback((item: Item) => item.id, []);

// 4. Provide getItemLayout for fixed-height items
const getItemLayout = useCallback(
  (data: Item[] | null, index: number) => ({
    length: ITEM_HEIGHT, // Fixed height
    offset: ITEM_HEIGHT * index,
    index,
  }),
  []
);

// 5. Apply to FlatList
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  getItemLayout={getItemLayout}
  // Performance props
  removeClippedSubviews={true} // Android: detach off-screen
  maxToRenderPerBatch={10} // Items per batch
  windowSize={5} // Render window (5 = 2 screens each side)
  initialNumToRender={10} // Initial items
  updateCellsBatchingPeriod={50} // Batching delay
/>
```

### Why Each Optimization Matters

| Optimization | What It Prevents | Impact |
|--------------|------------------|--------|
| `React.memo` | Re-render on parent change | 🔴 Critical |
| `useCallback renderItem` | New function every render | 🔴 Critical |
| Stable `keyExtractor` | Wrong item recycling | 🔴 Critical |
| `getItemLayout` | Async layout calculation | 🟡 High |
| `removeClippedSubviews` | Memory from off-screen | 🟡 High |
| `maxToRenderPerBatch` | Blocking main thread | 🟢 Medium |
| `windowSize` | Memory usage | 🟢 Medium |

### FlashList: The Better Option
```javascript
// Consider FlashList for better performance
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={items}
  renderItem={renderItem}
  estimatedItemSize={ITEM_HEIGHT}
  keyExtractor={keyExtractor}
/>

// Benefits over FlatList:
// ├── Faster recycling
// ├── Better memory management
// ├── Simpler API
// └── Fewer optimization props needed
```

### Animation Performance
```javascript
// ❌ JS-driven animation (blocks JS thread)
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: false, // BAD!
}).start();

// ✅ Native-driver animation (runs on UI thread)
Animated.timing(value, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true, // GOOD!
}).start();

// Native driver supports ONLY:
// ├── transform (translate, scale, rotate)
// └── opacity
// 
// Does NOT support:
// ├── width, height
// ├── backgroundColor
// ├── borderRadius changes
// └── margin, padding
```

### Reanimated for Complex Animations

```javascript
// For animations native driver can't handle, use Reanimated 3

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Component = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(offset.value) }],
  }));

  return <Animated.View style={animatedStyles} />;
};

// Benefits:
// ├── Runs on UI thread (60fps guaranteed)
// ├── Can animate any property
// ├── Gesture-driven animations
// └── Worklets for complex logic
```

### Memory Leak Prevention
```javascript
// ❌ Memory leak: uncleared interval
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  // Missing cleanup!
}, []);

// ✅ Proper cleanup
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  
  return () => clearInterval(interval); // CLEANUP!
}, []);

// Common memory leak sources:
// ├── Timers (setInterval, setTimeout)
// ├── Event listeners
// ├── Subscriptions (WebSocket, PubSub)
// ├── Async operations that update state after unmount
// └── Image caching without limits
```

### React Native Performance Checklist
```markdown
## Before Every List
- [ ] Using FlatList or FlashList (NOT ScrollView)
- [ ] renderItem is useCallback memoized
- [ ] List items are React.memo wrapped
- [ ] keyExtractor uses stable ID (NOT index)
- [ ] getItemLayout provided (if fixed height)

## Before Every Animation
- [ ] useNativeDriver: true (if possible)
- [ ] Using Reanimated for complex animations
- [ ] Only animating transform/opacity
- [ ] Tested on low-end Android device

## Before Any Release
- [ ] console.log statements removed
- [ ] Cleanup functions in all useEffects
- [ ] No memory leaks (test with profiler)
- [ ] Tested in release build (not dev)
```

---

## 3. Flutter Performance

### 🚫 The #1 AI Mistake: setState Overuse
```dart
// ❌ WRONG: setState rebuilds ENTIRE widget tree
class BadCounter extends StatefulWidget {
  @override
  State<BadCounter> createState() => _BadCounterState();
}

class _BadCounterState extends State<BadCounter> {
  int _counter = 0;
  
  void _increment() {
    setState(() {
      _counter++; // This rebuilds EVERYTHING below!
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Counter: $_counter'),
        ExpensiveWidget(), // Rebuilds unnecessarily!
        AnotherExpensiveWidget(), // Rebuilds unnecessarily!
      ],
    );
  }
}
```

### The `const` Constructor Revolution

```dart
// ✅ CORRECT: const prevents rebuilds

class GoodCounter extends StatefulWidget {
  const GoodCounter({super.key}); // CONST constructor!
  
  @override
  State<GoodCounter> createState() => _GoodCounterState();
}

class _GoodCounterState extends State<GoodCounter> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Counter: $_counter'),
        const ExpensiveWidget(), // Won't rebuild!
        const AnotherExpensiveWidget(), // Won't rebuild!
      ],
    );
  }
}

// RULE: Add `const` to EVERY widget that doesn't depend on state
```

### Targeted State Management
```dart
// ❌ setState rebuilds whole tree
setState(() => _value = newValue);

// ✅ ValueListenableBuilder: surgical rebuilds
class TargetedState extends StatelessWidget {
  final ValueNotifier<int> counter = ValueNotifier(0);
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Only this rebuilds when counter changes
        ValueListenableBuilder<int>(
          valueListenable: counter,
          builder: (context, value, child) => Text('$value'),
          child: const Icon(Icons.star), // Won't rebuild!
        ),
        const ExpensiveWidget(), // Never rebuilds
      ],
    );
  }
}
```

### Riverpod/Provider Best Practices
```dart
// ❌ WRONG: Reading entire provider in build
Widget build(BuildContext context) {
  final state = ref.watch(myProvider); // Rebuilds on ANY change
  return Text(state.name);
}

// ✅ CORRECT: Select only what you need
Widget build(BuildContext context) {
  final name = ref.watch(myProvider.select((s) => s.name));
  return Text(name); // Only rebuilds when name changes
}
```

### ListView Optimization
```dart
// ❌ WRONG: ListView without builder (renders all)
ListView(
  children: items.map((item) => ItemWidget(item)).toList(),
)

// ✅ CORRECT: ListView.builder (lazy rendering)
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
  // Additional optimizations:
  itemExtent: 56, // Fixed height = faster layout
  cacheExtent: 100, // Pre-render distance
)

// ✅ EVEN BETTER: ListView.separated for dividers
ListView.separated(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
  separatorBuilder: (context, index) => const Divider(),
)
```

### Image Optimization
```dart
// ❌ WRONG: No caching, full resolution
Image.network(url)

// ✅ CORRECT: Cached with proper sizing
CachedNetworkImage(
  imageUrl: url,
  width: 100,
  height: 100,
  fit: BoxFit.cover,
  memCacheWidth: 200, // Cache at 2x for retina
  memCacheHeight: 200,
  placeholder: (context, url) => const Skeleton(),
  errorWidget: (context, url, error) => const Icon(Icons.error),
)
```

### Dispose Pattern
```dart
class MyWidget extends StatefulWidget {
  @override
  State<MyWidget> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  late final StreamSubscription _subscription;
  late final AnimationController _controller;
  late final TextEditingController _textController;
  
  @override
  void initState() {
    super.initState();
    _subscription = stream.listen((_) {});
    _controller = AnimationController(vsync: this);
    _textController = TextEditingController();
  }
  
  @override
  void dispose() {
    // ALWAYS dispose in reverse order of creation
    _textController.dispose();
    _controller.dispose();
    _subscription.cancel();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) => Container();
}
```

### Flutter Performance Checklist

```markdown
## Before Every Widget
- [ ] const constructor added (if no runtime args)
- [ ] const keywords on static children
- [ ] Minimal setState scope
- [ ] Using selectors for provider watches

## Before Every List
- [ ] Using ListView.builder (NOT ListView with children)
- [ ] itemExtent provided (if fixed height)
- [ ] Image caching with size limits

## Before Any Animation
- [ ] Using Impeller (Flutter 3.16+)
- [ ] Avoiding Opacity widget (use FadeTransition)
- [ ] TickerProviderStateMixin for AnimationController

## Before Any Release
- [ ] All dispose() methods implemented
- [ ] No print() in production
- [ ] Tested in profile/release mode
- [ ] DevTools performance overlay checked
```

---

## 4. Jetpack Compose Performance

### 🚫 The #1 AI Mistake: Side Effects in Composition
```kotlin
// ❌ WRONG: Side effects directly in composition
@Composable
fun BadScreen(viewModel: MyViewModel) {
    // This runs on EVERY recomposition!
    viewModel.loadData() // CATASTROPHIC!
    
    val data by viewModel.data.collectAsState()
    Text(data)
}

// Why it's catastrophic:
// ├── Composition can happen multiple times per second
// ├── loadData() called hundreds of times
// ├── API hammered, battery drained
// └── App becomes unusable
```

### LaunchedEffect for Side Effects
```kotlin
// ✅ CORRECT: Side effects in LaunchedEffect
@Composable
fun GoodScreen(viewModel: MyViewModel) {
    // Runs ONCE when composition enters
    LaunchedEffect(Unit) {
        viewModel.loadData()
    }
    
    val data by viewModel.data.collectAsState()
    Text(data)
}

// ✅ CORRECT: Run when key changes
@Composable
fun UserProfile(userId: String, viewModel: UserViewModel) {
    LaunchedEffect(userId) { // Re-runs when userId changes
        viewModel.loadUser(userId)
    }
    
    val user by viewModel.user.collectAsState()
    // Render user...
}
```

### remember vs rememberSaveable
```kotlin
// ❌ WRONG: Recomputes on every recomposition
@Composable
fun BadList(items: List<Item>) {
    val filteredItems = items.filter { it.isActive } // Recomputes always!
    LazyColumn {
        items(filteredItems) { ItemRow(it) }
    }
}

// ✅ CORRECT: Cache computation with remember
@Composable
fun GoodList(items: List<Item>) {
    val filteredItems = remember(items) {
        items.filter { it.isActive } // Only when items change
    }
    LazyColumn {
        items(filteredItems) { ItemRow(it) }
    }
}

// ✅ EVEN BETTER: Use derivedStateOf for computed state
@Composable
fun BestList(items: List<Item>, query: String) {
    val filteredItems by remember {
        derivedStateOf {
            items.filter { it.name.contains(query, ignoreCase = true) }
        }
    } // Only recomputes when items OR query changes
    
    LazyColumn {
        items(filteredItems, key = { it.id }) { item ->
            ItemRow(item)
        }
    }
}
```

### LazyColumn Optimization
```kotlin
// ❌ WRONG: No stable keys, unstable content
@Composable
fun BadList(items: List<Item>) {
    LazyColumn {
        items(items) { item -> // No key!
            ItemRow(item = item) // Recreates on every change
        }
    }
}

// ✅ CORRECT: Stable keys + memoization
@Composable
fun GoodList(items: List<Item>) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(
            items = items,
            key = { item -> item.id } // Stable key for animations
        ) { item ->
            ItemRow(
                item = item,
                modifier = Modifier.animateItemPlacement() // Smooth animations
            )
        }
    }
}

// Item should be stable (data class with @Immutable/@Stable)
@Immutable
data class Item(
    val id: String,
    val name: String,
    val description: String
)
```

### State Hoisting vs Local State
```kotlin
// ❌ WRONG: Unnecessary state hoisting
@Composable
fun Parent() {
    var expanded by remember { mutableStateOf(false) }
    Child(expanded = expanded, onToggle = { expanded = !expanded })
}

@Composable
fun Child(expanded: Boolean, onToggle: () -> Unit) {
    // Only Child uses this state, why hoist?
}

// ✅ CORRECT: Keep state local when possible
@Composable
fun Parent() {
    Child() // No state passing needed
}

@Composable
fun Child() {
    var expanded by remember { mutableStateOf(false) }
    // Use expanded locally
}

// RULE: Hoist state ONLY when:
// ├── Multiple composables need it
// ├── Parent needs to control it
// └── State needs to survive configuration changes (use rememberSaveable)
```

### Recomposition Optimization
```kotlin
// ❌ WRONG: Entire screen recomposes on every state change
@Composable
fun BadScreen(viewModel: MyViewModel) {
    val state by viewModel.state.collectAsState()
    
    Column {
        Header(state.title)
        Content(state.items)
        Footer(state.count)
    } // All recompose when ANY state changes
}

// ✅ CORRECT: Separate state flows for independent sections
@Composable
fun GoodScreen(viewModel: MyViewModel) {
    Column {
        Header(viewModel.title.collectAsState().value)
        Content(viewModel.items.collectAsState().value)
        Footer(viewModel.count.collectAsState().value)
    } // Each recomposes independently
}

// ✅ EVEN BETTER: Extract to separate composables
@Composable
fun BestScreen(viewModel: MyViewModel) {
    Column {
        HeaderSection(viewModel)
        ContentSection(viewModel)
        FooterSection(viewModel)
    }
}

@Composable
private fun HeaderSection(viewModel: MyViewModel) {
    val title by viewModel.title.collectAsState()
    Header(title) // Only this recomposes when title changes
}
```

### Animation Performance
```kotlin
// ❌ WRONG: Animating offset (causes recomposition)
@Composable
fun BadAnimation() {
    var offset by remember { mutableStateOf(0f) }
    
    LaunchedEffect(Unit) {
        animate(
            initialValue = 0f,
            targetValue = 100f
        ) { value, _ ->
            offset = value // Recomposition on every frame!
        }
    }
    
    Box(Modifier.offset { IntOffset(offset.toInt(), 0) })
}

// ✅ CORRECT: Use graphicsLayer (no recomposition)
@Composable
fun GoodAnimation() {
    val offset by animateFloatAsState(
        targetValue = 100f,
        animationSpec = spring()
    )
    
    Box(
        Modifier.graphicsLayer {
            translationX = offset // GPU-accelerated, no recomposition!
        }
    )
}

// ✅ Compose animation APIs (all optimized):
animateFloatAsState()      // Single value
animateDpAsState()         // Dp values
animateColorAsState()      // Colors
updateTransition()         // Multiple values
Animatable()               // Manual control
```

### Memory Management
```kotlin
// ❌ WRONG: No cleanup
@Composable
fun BadLocationTracker() {
    val context = LocalContext.current
    
    LaunchedEffect(Unit) {
        val locationManager = context.getSystemService<LocationManager>()
        val listener = object : LocationListener {
            override fun onLocationChanged(location: Location) {
                // Update UI
            }
        }
        locationManager?.requestLocationUpdates(
            LocationManager.GPS_PROVIDER,
            1000L,
            0f,
            listener
        )
        // Missing cleanup!
    }
}

// ✅ CORRECT: DisposableEffect for cleanup
@Composable
fun GoodLocationTracker() {
    val context = LocalContext.current
    
    DisposableEffect(Unit) {
        val locationManager = context.getSystemService<LocationManager>()
        val listener = object : LocationListener {
            override fun onLocationChanged(location: Location) {
                // Update UI
            }
        }
        
        locationManager?.requestLocationUpdates(
            LocationManager.GPS_PROVIDER,
            1000L,
            0f,
            listener
        )
        
        onDispose {
            locationManager?.removeUpdates(listener) // CLEANUP!
        }
    }
}
```

### Jetpack Compose Performance Checklist
```markdown
## Before Every Composable
- [ ] Side effects in LaunchedEffect/DisposableEffect (NOT in composition)
- [ ] Expensive computations in remember/derivedStateOf
- [ ] Data classes marked @Immutable or @Stable
- [ ] Local state when possible (avoid unnecessary hoisting)

## Before Every LazyColumn/LazyRow
- [ ] Stable keys provided (key = { item.id })
- [ ] Items are @Immutable data classes
- [ ] Using contentPadding instead of outer padding
- [ ] animateItemPlacement() for smooth animations

## Before Every Animation
- [ ] Using graphicsLayer (NOT offset/size modifiers)
- [ ] Animating transform/opacity only
- [ ] Using Compose animation APIs (not manual state)
- [ ] Tested at 60fps

## Before Any Release
- [ ] No side effects in composition
- [ ] DisposableEffect cleanup implemented
- [ ] Layout Inspector checked for recomposition
- [ ] Tested in release build
```

---

## 5. Kotlin Multiplatform Performance

### 🚫 The #1 AI Mistake: Blocking iOS Main Thread
```kotlin
// ❌ WRONG: Blocks iOS main thread (UI freezes)
class BadRepository {
    suspend fun getUsers(): List<User> {
        return withContext(Dispatchers.Default) {
            apiClient.fetchUsers() // Blocks iOS main thread!
        }
    }
}

// Why it fails on iOS:
// ├── Kotlin/Native coroutines run on main thread by default
// ├── Dispatchers.Default = main thread on iOS
// ├── Network call blocks UI
// └── iOS watchdog kills app

// ✅ CORRECT: Use MainScope for iOS compatibility
class GoodRepository {
    private val scope = MainScope() // iOS-safe
    
    fun getUsers(onResult: (List<User>) -> Unit, onError: (Throwable) -> Unit) {
        scope.launch {
            try {
                val users = apiClient.fetchUsers()
                onResult(users)
            } catch (e: Exception) {
                onError(e)
            }
        }
    }
}
```

### Thread Safety with Immutability
```kotlin
// ❌ WRONG: Mutable shared state (crashes on iOS pre-new memory model)
class BadViewModel {
    var users: MutableList<User> = mutableListOf() // DANGER on iOS!
    
    fun addUser(user: User) {
        users.add(user) // Can crash on iOS
    }
}

// Why it fails:
// ├── Kotlin/Native (pre-1.7) requires objects to be frozen when shared
// ├── Mutable collections can't be frozen
// ├── Accessing from different threads = crash
// └── StateFlow helps but data must be immutable

// ✅ CORRECT: Immutable data + StateFlow
class GoodViewModel {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()
    
    fun addUser(user: User) {
        _users.update { currentList ->
            currentList + user // New list, not mutating
        }
    }
}

// Data classes should be immutable
@Serializable
data class User(
    val id: String,
    val name: String,
    val email: String
) // No var properties!
```

### iOS Framework Size Optimization
```kotlin
// build.gradle.kts

kotlin {
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "shared"
            
            // ✅ Use static framework (smaller size)
            isStatic = true
            
            // ✅ Export only needed dependencies
            export("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
            // Don't export everything!
            
            // ✅ Strip debug symbols in release
            freeCompilerArgs += listOf(
                "-Xbinary=stripDebugInfo=true"
            )
        }
    }
}

// Typical framework sizes:
// ├── Debug: 20-50 MB (with symbols)
// ├── Release (unoptimized): 10-20 MB
// └── Release (optimized): 5-10 MB
```

### Database Performance (SQLDelight)
```kotlin
// ❌ WRONG: Individual queries in loop (N+1 problem)
fun loadUsersWithPosts(): List<UserWithPosts> {
    val users = database.userQueries.selectAll().executeAsList()
    return users.map { user ->
        val posts = database.postQueries.selectByUserId(user.id).executeAsList()
        UserWithPosts(user, posts) // N queries!
    }
}

// ✅ CORRECT: Single JOIN query
// In .sq file:
selectUsersWithPosts:
SELECT 
    User.*,
    Post.id AS post_id,
    Post.title AS post_title,
    Post.content AS post_content
FROM User
LEFT JOIN Post ON User.id = Post.userId;

fun loadUsersWithPosts(): List<UserWithPosts> {
    return database.userQueries.selectUsersWithPosts()
        .executeAsList()
        .groupBy { it.id }
        .map { (userId, rows) ->
            UserWithPosts(
                user = rows.first().toUser(),
                posts = rows.mapNotNull { it.toPost() }
            )
        }
}

// ✅ CORRECT: Batch inserts with transaction
fun insertUsers(users: List<User>) {
    database.transaction {
        users.forEach { user ->
            database.userQueries.insert(user.id, user.name, user.email)
        }
    } // Single transaction = 10-100x faster
}
```

### Network Performance (Ktor)
```kotlin
// ❌ WRONG: No connection pooling, sequential requests
class BadApiClient {
    private val client = HttpClient()
    
    suspend fun loadDashboard(): Dashboard {
        val user = client.get("https://api.example.com/user").body<User>()
        val posts = client.get("https://api.example.com/posts").body<List<Post>>()
        val notifications = client.get("https://api.example.com/notifications").body<List<Notification>>()
        return Dashboard(user, posts, notifications)
    }
}

// ✅ CORRECT: Connection pooling + parallel requests
class GoodApiClient {
    private val client = HttpClient {
        // Platform-specific engines
        engine {
            // Android: OkHttp
            threadsCount = 4
            pipelining = true
        }
        
        install(HttpTimeout) {
            requestTimeoutMillis = 10_000
            connectTimeoutMillis = 5_000
        }
        
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                isLenient = true
            })
        }
        
        install(Logging) {
            level = if (BuildConfig.DEBUG) LogLevel.BODY else LogLevel.NONE
        }
    }
    
    suspend fun loadDashboard(): Dashboard = coroutineScope {
        // Parallel requests
        val userDeferred = async { client.get("https://api.example.com/user").body<User>() }
        val postsDeferred = async { client.get("https://api.example.com/posts").body<List<Post>>() }
        val notificationsDeferred = async { client.get("https://api.example.com/notifications").body<List<Notification>>() }
        
        Dashboard(
            user = userDeferred.await(),
            posts = postsDeferred.await(),
            notifications = notificationsDeferred.await()
        )
    }
}
```

### Memory Model Considerations
```kotlin
// Kotlin/Native Memory Models:
// ├── Old (pre-1.7): Strict freezing, immutability required
// └── New (1.7+): Similar to JVM, more flexible

// Enable new memory model (gradle.properties):
kotlin.native.binary.memoryModel=experimental

// ✅ With new memory model:
class ModernViewModel {
    // Mutable state is now safe!
    private val _state = MutableStateFlow(UiState.Loading)
    val state = _state.asStateFlow()
    
    fun updateState(newState: UiState) {
        _state.value = newState // Safe on both platforms
    }
}

// ❌ With old memory model (Kotlin < 1.7):
// Would need to freeze objects:
data class User(val id: String, val name: String) {
    init {
        freeze() // Required for sharing between threads
    }
}
```

### Compose Multiplatform Performance
```kotlin
// Same performance principles as Jetpack Compose apply

// ✅ CORRECT: Platform-specific optimization
@Composable
expect fun PlatformOptimizedImage(
    url: String,
    modifier: Modifier = Modifier
)

// androidMain
@Composable
actual fun PlatformOptimizedImage(url: String, modifier: Modifier) {
    // Use Coil on Android
    AsyncImage(
        model = ImageRequest.Builder(LocalContext.current)
            .data(url)
            .crossfade(true)
            .build(),
        contentDescription = null,
        modifier = modifier
    )
}

// iosMain
@Composable
actual fun PlatformOptimizedImage(url: String, modifier: Modifier) {
    // Use native iOS image loading
    // (Compose Multiplatform doesn't have Coil for iOS yet)
}
```

### Kotlin Multiplatform Performance Checklist
```markdown
## Before Every Shared Module
- [ ] Immutable data classes (no var properties)
- [ ] StateFlow for reactive state (not mutable collections)
- [ ] Transactions for batch database operations
- [ ] Parallel network requests (async/await)
- [ ] New