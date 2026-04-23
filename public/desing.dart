import 'package:flutter/material.dart';

class GnomeTheme {
  // ── Light Theme Colors ─────────────────────────────────────────────────────
  static const Color lightBackground = Color(0xFFFCFCFC);
  static const Color lightForeground = Color(0xFF3D3D3D);
  static const Color lightCard = Color(0xFFFFFFFF);
  static const Color lightPrimary = Color(0xFFE95420); // Ubuntu Orange
  static const Color lightOnPrimary = Color(0xFFFFFFFF);
  static const Color lightDestructive = Color(0xFFC7162B); // Yaru Red
  static const Color lightSuccess = Color(0xFF2CA05A); // Yaru Green
  static const Color lightWarning = Color(0xFFEDC948);
  static const Color lightBorder = Color(0xFFD6D6D6);
  static const Color lightInput = Color(0xFFE5E5E5);
  static const Color lightMuted = Color(0xFFF0F0F0);
  static const Color lightMutedForeground = Color(0xFF7A7A7A);

  // ── Dark Theme Colors ──────────────────────────────────────────────────────
  static const Color darkBackground = Color(0xFF1E1E1E); // Dark Aubergine/Grey
  static const Color darkForeground = Color(0xFFF7F7F7);
  static const Color darkCard = Color(0xFF2D2D2D);
  static const Color darkPrimary = Color(0xFFE95420);
  static const Color darkOnPrimary = Color(0xFFFFFFFF);
  static const Color darkDestructive = Color(0xFFE04A46);
  static const Color darkSuccess = Color(0xFF35A962);
  static const Color darkWarning = Color(0xFFF2D364);
  static const Color darkBorder = Color(0xFF4A4A4A);
  static const Color darkInput = Color(0xFF3E3E3E);
  static const Color darkMuted = Color(0xFF333333);
  static const Color darkMutedForeground = Color(0xFFA1A1A1);

  // ── Radii ──────────────────────────────────────────────────────────────────
  static const double radiusSm = 4.0;
  static const double radiusMd = 6.0;
  static const double radiusLg = 8.0;
  static const double radiusXl = 12.0;

  // ── Text Theme Base ────────────────────────────────────────────────────────
  static TextTheme _buildTextTheme(Color foreground, Color muted) {
    return TextTheme(
      displayLarge: TextStyle(color: foreground, fontWeight: FontWeight.bold),
      displayMedium: TextStyle(color: foreground, fontWeight: FontWeight.bold),
      displaySmall: TextStyle(color: foreground, fontWeight: FontWeight.bold),
      headlineLarge: TextStyle(color: foreground, fontWeight: FontWeight.w700),
      headlineMedium: TextStyle(color: foreground, fontWeight: FontWeight.w600),
      headlineSmall: TextStyle(color: foreground, fontWeight: FontWeight.w600),
      titleLarge: TextStyle(color: foreground, fontWeight: FontWeight.w600),
      titleMedium: TextStyle(color: foreground, fontWeight: FontWeight.w500),
      titleSmall: TextStyle(color: foreground, fontWeight: FontWeight.w500),
      bodyLarge: TextStyle(color: foreground),
      bodyMedium: TextStyle(color: foreground),
      bodySmall: TextStyle(color: muted),
      labelLarge: TextStyle(color: foreground, fontWeight: FontWeight.w500),
      labelMedium: TextStyle(color: muted, fontWeight: FontWeight.w500),
      labelSmall: TextStyle(color: muted, fontWeight: FontWeight.w500),
    );
  }

  // ── Light Theme Configuration ──────────────────────────────────────────────
  static ThemeData get lightTheme {
    final colorScheme = const ColorScheme.light(
      primary: lightPrimary,
      onPrimary: lightOnPrimary,
      secondary: lightMuted,
      onSecondary: lightForeground,
      error: lightDestructive,
      onError: Colors.white,
      surface: lightCard,
      onSurface: lightForeground,
      outline: lightBorder,
      outlineVariant: lightInput,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: lightPrimary,
      scaffoldBackgroundColor: lightBackground,
      cardColor: lightCard,
      fontFamily: 'Ubuntu',
      colorScheme: colorScheme,
      textTheme: _buildTextTheme(lightForeground, lightMutedForeground),
      iconTheme: const IconThemeData(color: lightForeground),
      dividerTheme: const DividerThemeData(
        color: lightBorder,
        thickness: 1,
        space: 1,
      ),

      // ── Widgets ────────────────────────────────────────────────────────────

      appBarTheme: const AppBarTheme(
        backgroundColor: lightCard,
        foregroundColor: lightForeground,
        elevation: 0,
        scrolledUnderElevation: 1,
        shadowColor: Colors.black12,
        centerTitle: true,
        iconTheme: IconThemeData(color: lightForeground),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: lightCard,
        selectedItemColor: lightPrimary,
        unselectedItemColor: lightMutedForeground,
        elevation: 8,
        type: BottomNavigationBarType.fixed,
      ),

      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: lightCard,
        indicatorColor: lightPrimary.withOpacity(0.15),
        labelTextStyle: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const TextStyle(color: lightPrimary, fontWeight: FontWeight.w600, fontSize: 12);
          }
          return const TextStyle(color: lightMutedForeground, fontWeight: FontWeight.w500, fontSize: 12);
        }),
        iconTheme: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const IconThemeData(color: lightPrimary);
          }
          return const IconThemeData(color: lightMutedForeground);
        }),
      ),

      cardTheme: CardTheme(
        color: lightCard,
        elevation: 2,
        shadowColor: Colors.black.withOpacity(0.1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusLg),
          side: const BorderSide(color: lightBorder, width: 1),
        ),
        clipBehavior: Clip.antiAlias,
        margin: const EdgeInsets.all(8),
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: lightPrimary,
          foregroundColor: lightOnPrimary,
          elevation: 2,
          shadowColor: lightPrimary.withOpacity(0.4),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: lightForeground,
          side: const BorderSide(color: lightBorder, width: 1),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: lightPrimary,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: lightMuted,
          foregroundColor: lightForeground,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: lightPrimary,
        foregroundColor: lightOnPrimary,
        elevation: 4,
        highlightElevation: 8,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: lightCard,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        hintStyle: const TextStyle(color: lightMutedForeground),
        labelStyle: const TextStyle(color: lightForeground),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: lightInput, width: 1),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: lightInput, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: lightPrimary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: lightDestructive, width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: lightDestructive, width: 2),
        ),
      ),

      dialogTheme: DialogTheme(
        backgroundColor: lightCard,
        elevation: 24,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusXl),
          side: const BorderSide(color: lightBorder, width: 1),
        ),
        titleTextStyle: const TextStyle(color: lightForeground, fontSize: 20, fontWeight: FontWeight.w600),
        contentTextStyle: const TextStyle(color: lightForeground, fontSize: 16),
      ),

      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: lightCard,
        elevation: 16,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(radiusXl)),
        ),
        clipBehavior: Clip.antiAlias,
      ),

      snackBarTheme: SnackBarThemeData(
        backgroundColor: lightForeground,
        actionTextColor: lightPrimary,
        contentTextStyle: const TextStyle(color: lightCard),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
        behavior: SnackBarBehavior.floating,
        elevation: 6,
      ),

      checkboxTheme: CheckboxThemeData(
        fillColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return lightPrimary;
          return Colors.transparent;
        }),
        checkColor: MaterialStateProperty.all(lightOnPrimary),
        side: const BorderSide(color: lightBorder, width: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
      ),

      radioTheme: RadioThemeData(
        fillColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return lightPrimary;
          return lightBorder;
        }),
      ),

      switchTheme: SwitchThemeData(
        thumbColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return lightOnPrimary;
          return lightBorder;
        }),
        trackColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return lightPrimary;
          return lightMuted;
        }),
        trackOutlineColor: MaterialStateProperty.all(Colors.transparent),
      ),

      sliderTheme: const SliderThemeData(
        activeTrackColor: lightPrimary,
        inactiveTrackColor: lightMuted,
        thumbColor: lightPrimary,
        overlayColor: Color(0x33E95420), // Primary with 20% opacity
        valueIndicatorColor: lightPrimary,
      ),

      tabBarTheme: const TabBarTheme(
        labelColor: lightPrimary,
        unselectedLabelColor: lightMutedForeground,
        indicatorColor: lightPrimary,
        indicatorSize: TabBarIndicatorSize.tab,
      ),

      listTileTheme: const ListTileThemeData(
        iconColor: lightMutedForeground,
        textColor: lightForeground,
        selectedColor: lightPrimary,
        selectedTileColor: Color(0x11E95420),
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),

      menuTheme: MenuThemeData(
        style: MenuStyle(
          backgroundColor: MaterialStateProperty.all(lightCard),
          elevation: MaterialStateProperty.all(8),
          shape: MaterialStateProperty.all(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(radiusMd),
              side: const BorderSide(color: lightBorder, width: 1),
            ),
          ),
        ),
      ),

      popupMenuTheme: PopupMenuThemeData(
        color: lightCard,
        elevation: 8,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          side: const BorderSide(color: lightBorder, width: 1),
        ),
        textStyle: const TextStyle(color: lightForeground),
      ),

      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: lightForeground.withOpacity(0.9),
          borderRadius: BorderRadius.circular(radiusSm),
        ),
        textStyle: const TextStyle(color: lightBackground, fontSize: 12),
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      ),
    );
  }

  // ── Dark Theme Configuration ───────────────────────────────────────────────
  static ThemeData get darkTheme {
    final colorScheme = const ColorScheme.dark(
      primary: darkPrimary,
      onPrimary: darkOnPrimary,
      secondary: darkMuted,
      onSecondary: darkForeground,
      error: darkDestructive,
      onError: Colors.white,
      surface: darkCard,
      onSurface: darkForeground,
      outline: darkBorder,
      outlineVariant: darkInput,
    );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: darkPrimary,
      scaffoldBackgroundColor: darkBackground,
      cardColor: darkCard,
      fontFamily: 'Ubuntu',
      colorScheme: colorScheme,
      textTheme: _buildTextTheme(darkForeground, darkMutedForeground),
      iconTheme: const IconThemeData(color: darkForeground),
      dividerTheme: const DividerThemeData(
        color: darkBorder,
        thickness: 1,
        space: 1,
      ),

      // ── Widgets ────────────────────────────────────────────────────────────

      appBarTheme: const AppBarTheme(
        backgroundColor: darkCard,
        foregroundColor: darkForeground,
        elevation: 0,
        scrolledUnderElevation: 1,
        shadowColor: Colors.black54,
        centerTitle: true,
        iconTheme: IconThemeData(color: darkForeground),
      ),

      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: darkCard,
        selectedItemColor: darkPrimary,
        unselectedItemColor: darkMutedForeground,
        elevation: 8,
        type: BottomNavigationBarType.fixed,
      ),

      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: darkCard,
        indicatorColor: darkPrimary.withOpacity(0.2),
        labelTextStyle: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const TextStyle(color: darkPrimary, fontWeight: FontWeight.w600, fontSize: 12);
          }
          return const TextStyle(color: darkMutedForeground, fontWeight: FontWeight.w500, fontSize: 12);
        }),
        iconTheme: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) {
            return const IconThemeData(color: darkPrimary);
          }
          return const IconThemeData(color: darkMutedForeground);
        }),
      ),

      cardTheme: CardTheme(
        color: darkCard,
        elevation: 4,
        shadowColor: Colors.black.withOpacity(0.4),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusLg),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
        clipBehavior: Clip.antiAlias,
        margin: const EdgeInsets.all(8),
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: darkPrimary,
          foregroundColor: darkOnPrimary,
          elevation: 4,
          shadowColor: Colors.black.withOpacity(0.5),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: darkForeground,
          side: const BorderSide(color: darkBorder, width: 1),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: darkPrimary,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: darkMuted,
          foregroundColor: darkForeground,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),

      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: darkPrimary,
        foregroundColor: darkOnPrimary,
        elevation: 6,
        highlightElevation: 12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(16)),
        ),
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: darkCard,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        hintStyle: const TextStyle(color: darkMutedForeground),
        labelStyle: const TextStyle(color: darkForeground),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: darkInput, width: 1),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: darkInput, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: darkPrimary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: darkDestructive, width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: darkDestructive, width: 2),
        ),
      ),

      dialogTheme: DialogTheme(
        backgroundColor: darkCard,
        elevation: 24,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusXl),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
        titleTextStyle: const TextStyle(color: darkForeground, fontSize: 20, fontWeight: FontWeight.w600),
        contentTextStyle: const TextStyle(color: darkForeground, fontSize: 16),
      ),

      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: darkCard,
        elevation: 16,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(radiusXl)),
        ),
        clipBehavior: Clip.antiAlias,
      ),

      snackBarTheme: SnackBarThemeData(
        backgroundColor: darkForeground,
        actionTextColor: darkBackground,
        contentTextStyle: const TextStyle(color: darkBackground),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(radiusMd)),
        behavior: SnackBarBehavior.floating,
        elevation: 6,
      ),

      checkboxTheme: CheckboxThemeData(
        fillColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return darkPrimary;
          return Colors.transparent;
        }),
        checkColor: MaterialStateProperty.all(darkOnPrimary),
        side: const BorderSide(color: darkBorder, width: 2),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(2)),
      ),

      radioTheme: RadioThemeData(
        fillColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return darkPrimary;
          return darkBorder;
        }),
      ),

      switchTheme: SwitchThemeData(
        thumbColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return darkOnPrimary;
          return darkForeground;
        }),
        trackColor: MaterialStateProperty.resolveWith((states) {
          if (states.contains(MaterialState.selected)) return darkPrimary;
          return darkMuted;
        }),
        trackOutlineColor: MaterialStateProperty.all(Colors.transparent),
      ),

      sliderTheme: const SliderThemeData(
        activeTrackColor: darkPrimary,
        inactiveTrackColor: darkMuted,
        thumbColor: darkPrimary,
        overlayColor: Color(0x33E95420), // Primary with 20% opacity
        valueIndicatorColor: darkPrimary,
      ),

      tabBarTheme: const TabBarTheme(
        labelColor: darkPrimary,
        unselectedLabelColor: darkMutedForeground,
        indicatorColor: darkPrimary,
        indicatorSize: TabBarIndicatorSize.tab,
      ),

      listTileTheme: const ListTileThemeData(
        iconColor: darkMutedForeground,
        textColor: darkForeground,
        selectedColor: darkPrimary,
        selectedTileColor: Color(0x22E95420),
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),

      menuTheme: MenuThemeData(
        style: MenuStyle(
          backgroundColor: MaterialStateProperty.all(darkCard),
          elevation: MaterialStateProperty.all(12),
          shape: MaterialStateProperty.all(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(radiusMd),
              side: const BorderSide(color: darkBorder, width: 1),
            ),
          ),
        ),
      ),

      popupMenuTheme: PopupMenuThemeData(
        color: darkCard,
        elevation: 12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
        textStyle: const TextStyle(color: darkForeground),
      ),

      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: darkForeground.withOpacity(0.9),
          borderRadius: BorderRadius.circular(radiusSm),
        ),
        textStyle: const TextStyle(color: darkBackground, fontSize: 12),
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      ),
    );
  }
}
