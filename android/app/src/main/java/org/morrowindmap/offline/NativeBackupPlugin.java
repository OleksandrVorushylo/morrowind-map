package org.morrowindmap.offline;

import android.app.Activity;
import android.content.Intent;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "NativeBackup")
public class NativeBackupPlugin extends Plugin {
    @PluginMethod
    public void save(PluginCall call) {
        String name = call.getString("name");
        String contents = call.getString("contents");
        if (name == null || contents == null) {
            call.reject("Backup data is missing");
            return;
        }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, name);
        startActivityForResult(call, intent, "saveResult");
    }

    @ActivityCallback
    private void saveResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        JSObject response = new JSObject();
        Intent data = result.getData();
        if (result.getResultCode() != Activity.RESULT_OK || data == null || data.getData() == null) {
            response.put("saved", false);
            call.resolve(response);
            return;
        }
        String contents = call.getString("contents");
        if (contents == null) {
            call.reject("Backup data is missing");
            return;
        }
        try (OutputStream output = getContext().getContentResolver().openOutputStream(data.getData())) {
            if (output == null) throw new IOException("Could not open the selected file");
            output.write(contents.getBytes(StandardCharsets.UTF_8));
            response.put("saved", true);
            call.resolve(response);
        } catch (IOException error) {
            call.reject("Could not save the backup", error);
        }
    }
}
