export interface Torrents {
    url: string;
    hash: string;
    quality: string;
    seeds: number;
    peers: number;
    size: string,
    size_bytes: number,
    date_uploaded:string;
    date_uploaded_unix: number
}

export interface YifyMeta{
   server_time:number;
   server_timezone: string;
   api_version: number;
   execution_time: string;
	
}

export interface Movies {

    id: number;
    url:string;
    imdb_code: string;
    title: string;
    title_english: string;
    title_long:string;
    slug: string;
    year: number;
    rating:number;
    runtime:number;
    genres: Array<string>;
    download_count: number;
    like_count: number;
    cast:Array<Cast>;
    summary: string;
    description_full:string; 
    synopsis:string;
    yt_trailer_code:string;
    language: string;
    mpa_rating: string;
    background_image:string;
    background_image_original:string
    small_cover_image:string;
    medium_cover_image: string;
    large_cover_image: string;
    state: string;
    torrents:Array<Torrents>
    date_uploaded: string;
    date_uploaded_unix: number;
    large_screenshot_image1:string;
    large_screenshot_image2:string;
    large_screenshot_image3:string;
    medium_screenshot_image1:string;
    medium_screenshot_image2:string;
    medium_screenshot_image3:string;

}

export interface Cast {
    name: string;
    character_name:string;
    url_small_image: string;
    imdb_code: string;
}

export interface ResponseData {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Array<Movies>;
    movie:Movies;
    cast:Array<Cast>;
    download_count: number;
    like_count: number;
    description_full:string;
    yt_trailer_code:string;
} 


export interface Response {
    status: string;
    status_message: string;
    data:ResponseData;
    
}

export interface Language {
    lang:string;
}
export interface DownloadLink{
    download_link:string;
}
export interface SubNames{
    subname:string;
}
export interface Rating{
    rating:string
}

export interface SubsceneSubtitlesLinks{
    link:string;
    lang:string;
    name:string;
    downstart:boolean;
    downcomplete:boolean;

}

export interface SubsceneLangReleaseNames{
    lang_name:string;
}

export interface SubsceneResults{
    down_links:Array<SubsceneSubtitlesLinks>;
    langs_names:Array<SubsceneLangReleaseNames>;
}
export interface YifySubtitleResultJson{
    lang_list:Array<Language>;
    rating_list:Array<Rating>;
    sub_links:Array<DownloadLink>;
    sub_names:Array<SubNames>;
}


export interface FinalYifySubList{
    lang:string;
    link:string;
    rating:string;
    name:string;
    downstart:boolean;
    downcomplete:boolean;
}

export interface TMDbResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results:Array<TMDbMovieResults>;
}

export interface TMDbMovieResults{
    id:number;
    name:string;
    poster_path:string;
    media_type:string;
    backdrop_path:string;
    vote_average:number;
    original_name:string;
    original_language:string;
    first_air_date:string;
    video:boolean;
    original_title:string;
    title:string;
    
}


