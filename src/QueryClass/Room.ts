/**
 * Created by tiffanyxu on 2017-02-17.
 */
export interface Room {
    // query:{};
    // you can define your own structure that complies with the EBNF here
    rooms_fullname: string;
    rooms_shortname: string;
    rooms_number: string;
    rooms_name: string;
    rooms_address: string;
    rooms_lat: number;
    rooms_lon: number;
    rooms_seats: number;
    rooms_type: string;
    rooms_furniture: string;
    rooms_href: string;

}
