<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\RestaurantDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function setLocale(Request $request, string $locale): RedirectResponse|JsonResponse
    {
        if (in_array($locale, ['en', 'it'], true)) {
            Session::put('locale', $locale);
            App::setLocale($locale);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'locale' => $locale,
                'translations' => RestaurantDataService::getTranslations($locale),
            ]);
        }

        return redirect()->back();
    }

    public function translations(Request $request, ?string $locale = null): JsonResponse
    {
        $targetLocale = $locale ?? Session::get('locale') ?? config('app.locale', 'en');
        if (!in_array($targetLocale, ['en', 'it'], true)) {
            $targetLocale = 'en';
        }

        return response()->json([
            'locale' => $targetLocale,
            'translations' => RestaurantDataService::getTranslations($targetLocale),
        ]);
    }
}
