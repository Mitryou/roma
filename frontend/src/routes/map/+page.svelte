<script lang="ts">
    import {onMount, onDestroy} from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import './index.css'
    import {locations, zonesFeatures} from '../constants';
    import type {CustomFeature, Location} from '../../types';

    const {Map, Marker} = mapboxgl;
    const initialCenter: [number, number] = [27.535326389787375, 53.94031907686613]; // Minsk, Belarus

    const filteredLocations = locations.filter(location => location.coordinates.length);
    const combinedArray = [
        ...filteredLocations.map((location: Location) => ({data: location, type: 'location'})),
        ...zonesFeatures.map((feature: CustomFeature) => ({data: feature, type: 'feature'}))
    ];
    const places = combinedArray.map((place, idx) => ({...place, id: `${place.type}-${idx}`}));

    const descriptionMaxLength = 200;

    let map;

    $: selectedPlace = null;
    $: isFullDescriptionView = false;

    onMount(() => {
        map = new Map({
            container: 'map',
            accessToken: 'pk.eyJ1Ijoic3RyYXBpLXVzZXIiLCJhIjoiY2xwZTV2YmRrMTk4ejJocmxrN3pqbGEzdCJ9.MQGuqEAPP3qrwfix8Cb--Q',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: initialCenter,
            zoom: 7,
            maxZoom: 20
        });

        map.on('load', draw);
    });

    onDestroy(() => map?.remove());

    function draw(): void {
        places.forEach((place) => {
            if (place.type === 'location') {
                drawMarker(place);
            }

            if (place.type === 'feature') {
                drawZone(place);
            }
        })
    }

    function drawMarker(place): void {
        const location = place.data as Location;

        const customIcon = document.createElement('div');
        customIcon.id = `marker-${place.id}`
        customIcon.className = 'marker';

        customIcon.addEventListener('click', () => onPlaceSelect(place));

        new Marker(customIcon)
            .setLngLat(location.coordinates)
            .addTo(map);
    }

    function drawZone(place): void {
        const feature = place.data as CustomFeature;

        map.addLayer({
            id: place.id,
            type: 'fill',
            source: {
                type: 'geojson',
                data: feature
            },
            paint: {
                'fill-color': '#f00',
                'fill-opacity': 0.5
            }
        });

        map.on('mouseenter', place.id, () => map.getCanvas().style.cursor = 'pointer');
        map.on('mouseleave', place.id, () => map.getCanvas().style.cursor = '');

        map.on('click', place.id, () => onPlaceSelect(place));
    }

    function onPlaceSelect(place): void {
        selectedPlace = place;

        highlightBtn(place);
        if (place.type === 'location') {
            document.querySelector('.marker.marker--active')?.classList.remove('marker--active');
            document.getElementById(`marker-${place.id}`).classList.add('marker--active');
            map.flyTo({
                center: place.data.coordinates,
                zoom: 12,
                essential: true
            });
            selectedPlace.shortDescription = cutDescription(place.data.description);
        }

        if (place.type === 'feature') {
            featureFitBounds(place.data.geometry.coordinates);
            selectedPlace.shortDescription = cutDescription(place.data.properties.description);
        }
    }

    function highlightBtn(place): void {
        document.querySelector('.btn.btn--active')?.classList.remove('btn--active');
        const btnEl = document.getElementById(place.id);
        btnEl?.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
        btnEl?.classList.add('btn--active');
    }

    function featureFitBounds(coordinates): void {
        const bounds = new mapboxgl.LngLatBounds(
            coordinates[0],
            coordinates[0]
        );

        for (const coord of coordinates) {
            bounds.extend(coord);
        }

        map.fitBounds(bounds, {padding: 100});
    }

    function cutDescription(description: string): string {
        if (description.length > descriptionMaxLength) {
            return description.slice(0, descriptionMaxLength) + '...';
        }
        return '';
    }

    function setIsFullDescriptionView(): void {
        isFullDescriptionView = !isFullDescriptionView;
    }
</script>

<section class="h-[calc(100vh_-_7rem)] relative flex flex-col">
    <div id="map"
         class="z-2 h-full w-full"
    >
    </div>
    <div class="w-full md:w-[368px] bg-white text-black md:absolute md:right-0 md:top-0 md:bottom-0 md:z-20">
        <div class="flex flex-col justify-between items-stretch h-full">
            <div class="w-full h-full pt-16 px-6 pb-9 shadow-lg z-10">
                {#if selectedPlace}
                    {#if isFullDescriptionView}
                        <button type="button"
                                class="hidden md:block absolute top-4 right-6"
                                on:click={setIsFullDescriptionView}
                                aria-label="Close">
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1054_73)">
                                    <rect x="5" y="5" width="32" height="32" rx="16" fill="#CCCCCC"/>
                                    <rect x="4.5" y="4.5" width="33" height="33" rx="16.5" stroke="#CCCCCC"/>
                                    <path d="M17.1678 17.1678C17.2209 17.1146 17.284 17.0724 17.3534 17.0436C17.4228 17.0148 17.4972 17 17.5723 17C17.6475 17 17.7219 17.0148 17.7913 17.0436C17.8607 17.0724 17.9237 17.1146 17.9768 17.1678L21.0002 20.1923L24.0235 17.1678C24.0766 17.1147 24.1397 17.0726 24.2091 17.0438C24.2785 17.0151 24.3529 17.0003 24.428 17.0003C24.5031 17.0003 24.5775 17.0151 24.6469 17.0438C24.7163 17.0726 24.7793 17.1147 24.8325 17.1678C24.8856 17.221 24.9277 17.284 24.9565 17.3534C24.9852 17.4228 25 17.4972 25 17.5723C25 17.6474 24.9852 17.7218 24.9565 17.7912C24.9277 17.8606 24.8856 17.9237 24.8325 17.9768L21.808 21.0002L24.8325 24.0235C24.8856 24.0766 24.9277 24.1397 24.9565 24.2091C24.9852 24.2785 25 24.3529 25 24.428C25 24.5031 24.9852 24.5775 24.9565 24.6469C24.9277 24.7163 24.8856 24.7793 24.8325 24.8325C24.7793 24.8856 24.7163 24.9277 24.6469 24.9565C24.5775 24.9852 24.5031 25 24.428 25C24.3529 25 24.2785 24.9852 24.2091 24.9565C24.1397 24.9277 24.0766 24.8856 24.0235 24.8325L21.0002 21.808L17.9768 24.8325C17.9237 24.8856 17.8606 24.9277 17.7912 24.9565C17.7218 24.9852 17.6474 25 17.5723 25C17.4972 25 17.4228 24.9852 17.3534 24.9565C17.284 24.9277 17.221 24.8856 17.1678 24.8325C17.1147 24.7793 17.0726 24.7163 17.0438 24.6469C17.0151 24.5775 17.0003 24.5031 17.0003 24.428C17.0003 24.3529 17.0151 24.2785 17.0438 24.2091C17.0726 24.1397 17.1147 24.0766 17.1678 24.0235L20.1923 21.0002L17.1678 17.9768C17.1146 17.9237 17.0724 17.8607 17.0436 17.7913C17.0148 17.7219 17 17.6475 17 17.5723C17 17.4972 17.0148 17.4228 17.0436 17.3534C17.0724 17.284 17.1146 17.2209 17.1678 17.1678Z" fill="white"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_1054_73" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="2"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0.5 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1054_73"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1054_73" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </button>
                    {/if}
                    {#if selectedPlace.type === 'location'}
                        <h3 class="mb-4">{selectedPlace.data.title}</h3>
                        {#if selectedPlace.shortDescription.length && !isFullDescriptionView}
                            <p class="text-base mb-4">{selectedPlace.shortDescription}</p>
                            <button type="button"
                                    class="w-full h-10 flex justify-center items-center gap-1 rounded border border-iron"
                                    on:click={setIsFullDescriptionView}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.99997 0C6.19888 0 6.38965 0.0790178 6.5303 0.21967C6.67095 0.360322 6.74997 0.551088 6.74997 0.75V9.4395L9.96897 6.219C10.0387 6.14927 10.1215 6.09395 10.2126 6.05621C10.3037 6.01848 10.4014 5.99905 10.5 5.99905C10.5986 5.99905 10.6962 6.01848 10.7873 6.05621C10.8785 6.09395 10.9612 6.14927 11.031 6.219C11.1007 6.28873 11.156 6.37152 11.1938 6.46262C11.2315 6.55373 11.2509 6.65138 11.2509 6.75C11.2509 6.84862 11.2315 6.94627 11.1938 7.03738C11.156 7.12848 11.1007 7.21127 11.031 7.281L6.53097 11.781C6.4613 11.8508 6.37854 11.9063 6.28742 11.9441C6.1963 11.9819 6.09862 12.0013 5.99997 12.0013C5.90132 12.0013 5.80364 11.9819 5.71252 11.9441C5.6214 11.9063 5.53864 11.8508 5.46897 11.781L0.968971 7.281C0.899239 7.21127 0.843925 7.12848 0.806186 7.03738C0.768447 6.94627 0.749023 6.84862 0.749023 6.75C0.749023 6.65138 0.768447 6.55373 0.806186 6.46262C0.843925 6.37152 0.899239 6.28873 0.968971 6.219C1.1098 6.07817 1.30081 5.99905 1.49997 5.99905C1.59859 5.99905 1.69624 6.01848 1.78735 6.05621C1.87846 6.09395 1.96124 6.14927 2.03097 6.219L5.24997 9.4395V0.75C5.24997 0.551088 5.32899 0.360322 5.46964 0.21967C5.61029 0.0790178 5.80106 0 5.99997 0Z"
                                          fill="black"/>
                                </svg>
                                <span>Развернуть</span>
                            </button>
                        {:else}
                            <p class="text-base">{selectedPlace.data.description}</p>
                        {/if}
                    {:else if selectedPlace.type === 'feature'}
                        <h3 class="mb-4">{selectedPlace.data.properties.title}</h3>
                        {#if selectedPlace.shortDescription.length && !isFullDescriptionView}
                            <p class="text-base mb-4">{selectedPlace.shortDescription}</p>
                            <button type="button"
                                    class="w-full h-10 flex justify-center items-center gap-1 rounded border border-iron"
                                    on:click={setIsFullDescriptionView}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5.99997 0C6.19888 0 6.38965 0.0790178 6.5303 0.21967C6.67095 0.360322 6.74997 0.551088 6.74997 0.75V9.4395L9.96897 6.219C10.0387 6.14927 10.1215 6.09395 10.2126 6.05621C10.3037 6.01848 10.4014 5.99905 10.5 5.99905C10.5986 5.99905 10.6962 6.01848 10.7873 6.05621C10.8785 6.09395 10.9612 6.14927 11.031 6.219C11.1007 6.28873 11.156 6.37152 11.1938 6.46262C11.2315 6.55373 11.2509 6.65138 11.2509 6.75C11.2509 6.84862 11.2315 6.94627 11.1938 7.03738C11.156 7.12848 11.1007 7.21127 11.031 7.281L6.53097 11.781C6.4613 11.8508 6.37854 11.9063 6.28742 11.9441C6.1963 11.9819 6.09862 12.0013 5.99997 12.0013C5.90132 12.0013 5.80364 11.9819 5.71252 11.9441C5.6214 11.9063 5.53864 11.8508 5.46897 11.781L0.968971 7.281C0.899239 7.21127 0.843925 7.12848 0.806186 7.03738C0.768447 6.94627 0.749023 6.84862 0.749023 6.75C0.749023 6.65138 0.768447 6.55373 0.806186 6.46262C0.843925 6.37152 0.899239 6.28873 0.968971 6.219C1.1098 6.07817 1.30081 5.99905 1.49997 5.99905C1.59859 5.99905 1.69624 6.01848 1.78735 6.05621C1.87846 6.09395 1.96124 6.14927 2.03097 6.219L5.24997 9.4395V0.75C5.24997 0.551088 5.32899 0.360322 5.46964 0.21967C5.61029 0.0790178 5.80106 0 5.99997 0Z"
                                          fill="black"/>
                                </svg>
                                <span>Развернуть</span>
                            </button>
                        {:else}
                            <p class="text-base">{selectedPlace.data.properties.description}</p>
                        {/if}
                    {/if}
                {:else}
                    <p class="text-sm">
                        Уничтожение ромского население проводилось по всей территории Беларуси, как под гражданским, так
                        и под военным управлением. Наличие мест уничтожение во всех областях современной Беларуси
                        указывает на массовый характер геноцида рома в Беларуси во время немецкой оккупации с 1941 по
                        1944 годы. Карта мест уничтожения составлена на основании немецких документов, а также актов
                        ЧГК, которые содержат факты уничтожения ромского населения. Архивные документы не всегда дают
                        точное количество жертв, поэтому данные о количестве жертв могут быть приблизительными либо и
                        вовсе отсутствовать.
                    </p>
                {/if}
            </div>
            <div id="list" class="sidebar-nav" class:sidebar-nav--hidden={isFullDescriptionView}>
                {#each places as place}
                    <button type="button"
                            id={place.id}
                            on:click={() => onPlaceSelect(place)}
                            class="btn"
                            class:btn--active={place.id === selectedPlace?.id}
                    >
                        <svg class="mr-2 shrink-0" width="12" height="16" viewBox="0 0 12 16"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8169 11.6787C11.3334 13.6176 10.1768 14.9889 8.17635 15.8949C8.95857 14.7684 9.69206 13.7855 9.16502 12.5104C8.8983 11.8658 8.4046 11.4057 7.64034 11.1237C7.68907 11.4941 7.78909 11.7837 7.74677 12.0529C7.69676 12.3835 7.60315 12.8846 7.39028 12.9717C7.18383 13.055 6.8235 13.0076 6.57601 12.8833C6.57601 12.8833 6.56575 12.8782 6.54651 12.8679C6.36827 12.7718 5.41935 12.2233 5.0821 11.3134C4.64483 10.1293 4.79486 8.53248 4.79486 8.53248C4.79486 8.53248 2.99063 11.0071 3.47022 13.4997C3.77028 15.0606 4.47428 15.8783 4.56019 15.9744C4.56276 15.9782 4.56532 15.9795 4.56532 15.9808L4.56917 15.9846C4.51916 16.0384 4.61918 15.9308 4.56917 15.9846C3.60614 15.8091 3.29197 15.6911 2.78674 15.3695C-0.00360337 13.5971 -0.838397 10.1882 0.9248 7.39319C1.66855 6.2129 2.67517 5.19792 3.55741 4.10477C4.05239 3.49091 4.57045 2.89243 5.02055 2.24782C5.48603 1.58142 5.70659 0.833 5.4373 0C7.25179 0.586944 8.94703 2.82195 8.38922 4.90188C8.25714 5.39271 8.18789 5.90148 8.12377 6.40769C8.05966 6.8998 8.23662 7.39319 8.72006 7.47137C9.06885 7.52775 9.50997 7.29708 9.83953 7.08562C10.0678 6.94081 10.1755 6.60889 10.3691 6.31286C11.7579 7.88018 12.3247 9.63332 11.8169 11.6787Z"/>
                        </svg>
                        <span>
                            {#if place.type === 'location'}
                                {place.data.title}
                            {:else if place.type === 'feature'}
                                {place.data.properties.title}
                            {/if}
                        </span>
                    </button>
                {/each}
            </div>
        </div>
    </div>
</section>
