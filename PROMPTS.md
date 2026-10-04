# Промпты для фотографий

Пока фотографий нет, на их месте показываются розово-лавандовые градиенты, так что сайт уже выглядит цельно.
Сгенерированные картинки положите в папку `img/` **с точно такими же именами**, и они появятся на сайте сами.

**Общие правила**

- Промпты на английском: так генераторы (Midjourney, DALL·E, Flux, Leonardo, Kandinsky) понимают их точнее.
- В конце каждого промпта уже есть общий стиль, чтобы все фото были в одной гамме.
- Никакого текста и логотипов на картинках: нейросети пишут буквы с ошибками.
- Формат JPG, вес до ~400 КБ (сожмите через squoosh.app или tinyjpg.com). PNG только для цветков на белом фоне.
- Для Midjourney добавьте в конец параметр соотношения сторон, например `--ar 9:16`.

Общий стиль (уже добавлен в каждый промпт ниже):
`soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial luxury floristry aesthetic, shot on Kodak Portra 400, fine film grain, shallow depth of field, no text, no logos, no watermark`

---

## 1. Обложка (первый экран)

### `hero-mobile.jpg` · 9:16 · 1080×1920 (телефон)
```
Vertical cinematic photo of a dreamy secret flower garden at golden hour: lush coral-pink peonies blooming in the bottom-left foreground, lavender, purple cranesbill and pale pink cosmos along the edges of the frame, a soft grass path leading into the misty depth, the centre and middle of the frame calm and slightly darker with empty space for a headline, warm hazy backlight, glowing particles in the air, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial luxury floristry aesthetic, shot on Kodak Portra 400, fine film grain, shallow depth of field, no text, no logos, no watermark --ar 9:16
```

### `hero-desktop.jpg` · 16:9 · 2400×1350 (компьютер)
```
Wide cinematic photo of a dreamy secret flower garden at golden hour: lush coral-pink peonies on the left edge, lavender, purple cranesbill and pale pink cosmos framing the right edge, a soft grass path in the centre leading into misty depth, the centre of the frame calm and slightly darker with empty space for a large headline, warm hazy backlight, glowing particles in the air, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial luxury floristry aesthetic, shot on Kodak Portra 400, fine film grain, shallow depth of field, no text, no logos, no watermark --ar 16:9
```

## 2. Блок «Решение» (круг в центре)

### `about.jpg` · 1:1 · 1200×1200
Обрезается в круг, поэтому главное держите в центре.
```
Top-down photo of a creative designer's desk in soft daylight: an open brand book with blush pink pages, Pantone colour swatches in pink and lilac fanned out, printed business cards, a pencil, a small glass vase with pink ranunculus and sweet peas in the centre, linen texture, airy minimalist composition centred in the frame, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial luxury floristry aesthetic, shot on Kodak Portra 400, fine film grain, shallow depth of field, no text, no logos, no watermark --ar 1:1
```

## 3. Цветы на белом фоне (этапы работы и декор)

Нужны **на чисто белом фоне**: сайт «растворяет» белый, и цветок как будто парит на странице. Сохраните в PNG или JPG, но с расширением `.png` в имени файла.

### `flower-1.png` · 1:1 · 1024×1024
```
A single airy lilac sweet pea sprig with delicate translucent petals and curly tendrils, slight motion blur and double exposure, dreamy soft focus edges, isolated on a pure white background, high-key studio light, no shadow, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, no text, no logos, no watermark --ar 1:1
```

### `flower-2.png` · 1:1 · 1024×1024
```
A small loose bunch of pale lavender and violet anemones with a sprig of dried lavender, ethereal translucent petals, slight motion blur, dreamy soft focus edges, isolated on a pure white background, high-key studio light, no shadow, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, no text, no logos, no watermark --ar 1:1
```

### `flower-3.png` · 1:1 · 1024×1024
```
A single coral-pink garden peony with soft lilac cosmos flowers beside it, petals glowing and slightly translucent, slight motion blur, dreamy soft focus edges, isolated on a pure white background, high-key studio light, no shadow, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, no text, no logos, no watermark --ar 1:1
```

### `flower-4.png` · 1:1 · 1024×1024
```
A delicate white and pale lilac phalaenopsis orchid branch with a few sprigs of lavender at the base, ethereal translucent petals, slight motion blur, dreamy soft focus edges, isolated on a pure white background, high-key studio light, no shadow, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, no text, no logos, no watermark --ar 1:1
```

## 4. Демо конструктора постов (фото «клиента» в телефоне)

### `post-1.jpg` · 1:1 · 1080×1080 (шаблоны «Акция» и «Сторис»)
Нижняя треть должна быть спокойной: там будет текст.
```
Overhead photo of a latte with heart latte art in a pink ceramic cup on a blush pink table, a croissant on a small plate and scattered rose petals, soft morning window light, plenty of calm empty space in the lower third of the frame, minimal cafe styling, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial aesthetic, shot on Kodak Portra 400, fine film grain, no text, no logos, no watermark --ar 1:1
```

### `post-2.jpg` · 1:1 · 1080×1080 (шаблон «Новинка»)
```
Product photo of three unbranded frosted glass skincare bottles with blank labels standing on a round lilac plaster podium, peony petals scattered around, soft shadows, calm empty space in the lower third of the frame, clean luxury cosmetics styling, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, shot on Kodak Portra 400, fine film grain, no text, no logos, no watermark --ar 1:1
```

### `post-3.jpg` · 1:1 · 1080×1080 (шаблон «Отзыв», обрезается в маленький круг)
```
Close portrait of a smiling young Central Asian woman in a cream knit sweater holding a small bouquet of pink tulips, face centred in the frame, cozy bright flower shop softly blurred behind her, warm natural light, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial aesthetic, shot on Kodak Portra 400, fine film grain, shallow depth of field, no text, no logos, no watermark --ar 1:1
```

## 5. Галерея в блоке «Доверие»

> Лучше всего сюда поставить **ваши реальные работы** (4 штуки, вертикальные 4:5), сохранив те же имена файлов. Промпты ниже нужны на случай, если реальных фото пока нет: это настроение, а не кейсы.

### `work-1.jpg` · 4:5 · 1080×1350 — Брендинг
```
Brand identity stationery mockup flat lay: business cards, letterhead and envelope in blush pink and deep burgundy with an elegant abstract serif monogram shape (no readable letters), wax seal, a few dried roses, on cream linen, top-down, soft daylight, soft dreamy pastel palette of blush pink, lavender and cream, editorial aesthetic, fine film grain, no readable text, no logos, no watermark --ar 4:5
```

### `work-2.jpg` · 4:5 · 1080×1350 — Упаковка
```
Packaging design mockup: a set of pastel lilac and blush pink cosmetic boxes and a paper shopping bag with a minimal floral line illustration, arranged on light pink plaster podiums of different heights, soft shadows, peony petals, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial aesthetic, fine film grain, no readable text, no logos, no watermark --ar 4:5
```

### `work-3.jpg` · 4:5 · 1080×1350 — Сайты
```
A modern laptop and a smartphone on a light oak desk, both screens showing an elegant pastel website with large soft floral photography and abstract layout blocks, a small glass vase with pink ranunculus next to them, soft daylight from a window, soft dreamy pastel palette of blush pink, lavender and cream, editorial aesthetic, fine film grain, no readable text, no logos, no watermark --ar 4:5
```

### `work-4.jpg` · 4:5 · 1080×1350 — SMM-дизайн
```
A hand with a pale pink manicure holding a smartphone that shows a cohesive Instagram-style photo grid in blush pink and lavender tones: flowers, products, coffee and pastel graphic tiles, background of softly blurred peonies, soft dreamy pastel palette of blush pink, lavender and cream, ethereal diffused light, editorial aesthetic, fine film grain, shallow depth of field, no readable text, no logos, no watermark --ar 4:5
```

## 6. Специальное предложение (фон карточки)

### `offer.jpg` · 4:5 · 1200×1500
Поверх будет тёмная вуаль и белый текст, поэтому подойдёт насыщенная картинка.
```
A hand holding a big lush bouquet of pink garden roses, peonies, cream daisies and yellow tansy flowers raised against a soft blue sky with fluffy white clouds, sunlight from behind, petals glowing, nostalgic dreamy mood, soft dreamy pastel palette of blush pink, lavender and cream with sky blue, ethereal diffused light, editorial luxury floristry aesthetic, shot on Kodak Portra 400, fine film grain, no text, no logos, no watermark --ar 4:5
```

---

## Итого: 15 файлов

| Файл | Формат | Где на сайте |
| --- | --- | --- |
| `hero-mobile.jpg` | 9:16 | Первый экран на телефоне |
| `hero-desktop.jpg` | 16:9 | Первый экран на компьютере |
| `about.jpg` | 1:1 | Круг в блоке «Решение» |
| `flower-1.png` … `flower-4.png` | 1:1, белый фон | Этапы работы и плавающие цветы |
| `post-1.jpg` … `post-3.jpg` | 1:1 | Демо конструктора в телефоне |
| `work-1.jpg` … `work-4.jpg` | 4:5 | Галерея в блоке «Доверие» |
| `offer.jpg` | 4:5 | Фон спецпредложения |
