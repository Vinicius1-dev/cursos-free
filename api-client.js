window.IniciaDevApi = (() => {
  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const config = {
      ...options,
      credentials: "same-origin",
      headers
    };

    if (options.body && typeof options.body !== "string") {
      headers.set("Content-Type", "application/json");
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(path, config);
    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json() : {};

    if (!response.ok) {
      const error = new Error(payload.message || "Não foi possível concluir a ação.");
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  }

  return {
    request,
    session: () => request("/api/auth/me"),
    signup: (data) => request("/api/auth/signup", { method: "POST", body: data }),
    login: (data) => request("/api/auth/login", { method: "POST", body: data }),
    logout: () => request("/api/auth/logout", { method: "POST", body: {} }),
    updateName: (name) => request("/api/me", { method: "PATCH", body: { name } }),
    updateSettings: (settings) => request("/api/settings", { method: "PUT", body: settings }),
    setSaved: (courseId, saved) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/save`, {
        method: "POST",
        body: { saved }
      }),
    setEnrolled: (courseId, enrolled) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/enroll`, {
        method: "POST",
        body: { enrolled }
      }),
    setProgress: (courseId, completed) =>
      request(`/api/courses/${encodeURIComponent(courseId)}/progress`, {
        method: "PUT",
        body: { completed }
      })
  };
})();
