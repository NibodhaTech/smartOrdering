/**
 * 
 */
package com.vacation.order.common;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

/**
 * @author Suresh Kumar S
 *
 */
public class SmartOrderingUtils {
	public static final String SCHEME = "http";
	public static final String HOST = "api.walkscore.com";
	public static final int PORT = -1;
	public static final String PATH = "/score";
	public static final String API_KEY = "91e03630d311ba66fd435d3772945487";
	public static final String DEFAULT_FORMAT = "xml";

	public static URI formUri(String latitude, String longitude, String address, String format){
		if(isNullOrBlank(latitude) || isNullOrBlank(longitude)) return null;
		StringBuilder requestUrl = new StringBuilder();
		URI uri = null; 
		requestUrl.append("format=" + (isNullOrBlank(format) ? DEFAULT_FORMAT : format));
		if(!isNullOrBlank(address)) requestUrl.append("&address=" + address);
		requestUrl.append("&lat=" + latitude);
		requestUrl.append("&lon=" + longitude);
		requestUrl.append("&wsapikey=" + API_KEY);
		try {
			uri = new URI(SCHEME, null, HOST, PORT, PATH, requestUrl.toString(), null);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return uri;
	}

	public static StringReader getResponse(URI uri) {
		HttpURLConnection connection = null;
		StringReader reader = null;
		try {
			URL url = uri.toURL();
			connection = (HttpURLConnection) url.openConnection();
			// add reuqest header
			connection.setRequestMethod("GET");
			connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
			connection.connect();

			BufferedReader rd = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			StringWriter writer = new StringWriter();
			String line = "";
			while ((line = rd.readLine()) != null) {
				writer.write(line);
			}
			reader = new StringReader(writer.toString());
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		} finally {
			if (null != connection) {
				connection.disconnect();
			}
		}
		return reader;
	}

	public static boolean isNullOrBlank(String param) { 
		return param == null || param.isEmpty();
	}

	public static void print(StringReader reader){
		try{
			int ch;
			while((ch = reader.read()) != -1){
				System.out.print((char)ch);
			}
		}catch(IOException e){
			e.printStackTrace();
		}
	}
	public static String getString(Object obj){
		return String.valueOf(obj);
	}
}
