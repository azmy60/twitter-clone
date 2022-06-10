<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet">

    @vite

    @routes
    @inertiaHead
    {{-- @env('local')
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['IBM Plex Sans', ...tailwind.defaultTheme.fontFamily.sans],
                    },
                },
            },
        }
    </script>
    @endenv --}}
</head>

<body class="bg-black font-sans text-neutral-200 antialiased">
    @inertia
</body>

</html>
