export class RegExUtils {
  static email = /[a-z0-9_\.\-]+@[a-z0-9_\.\-]*[a-z0-9_\.\-]+\.[a-z]{2,4}$/;
  static username = /(^[a-z]{1,}[a-z0-9\_]{1,})[\.]{0,1}$/;
  static numberInt = /^[0-9]{1,}$/;
  static numberFloat = /(^[0-9]{1,})([\.]{0,1}[0-9]{0,})$/;
}
